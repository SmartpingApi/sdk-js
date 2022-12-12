import { ApiEndpoints } from '../enums/api-endpoints'
import dayjs from 'dayjs'
import { default as Sha } from 'jssha/dist/sha1'
import md5 from 'md5'
import { v4 as uuidV4 } from 'uuid'
import { XMLParser } from 'fast-xml-parser';
import Organization, {
	OrganizationConstructorProperties,
} from '../models/organization/organization'
import Player from '../models/player/player'
import RankedPlayer from '../models/player/ranked-player'
import SpidPlayer from '../models/player/spid-player'

export type OrganizationStoreItem = {
	id: number;
	name: string;
	code: string;
	type: string;
	parentId: string;
}

type DecodedXml = { [key: string]: string | number | DecodedXml | DecodedXml[] };

export type FetchCallback = (endpoint: string, queryParameters: URLSearchParams) => Promise<string>;

export type FetchProperties<T,P> = {
	endpoint: ApiEndpoints,
	requestParameters?: {[key: string]: string},
	normalizationModel: Newable<T,P>,
	rootKey: string
}

export type Newable<T,P> = { new (properties: P): T; };

/** @description Identifiant unique fourni par la FFTT. */
let kAppId = '';

/** @description Mot de passe unique fourni par la FFTT. */
let kAppKey = '';

/** @description Chaîne de caractères identifiant l'utilisateur. */
const kSerial = uuidV4().replaceAll('-', '').slice(0, 15);

/** @description URL de base sur laquelle les endpoints se greffent. */
const kBaseUrl = 'https://apiv2.fftt.com/mobile/pxml';

/** @description Parser utilisé pour désérialiser les modèles XML. */
const parser = new XMLParser();

/**
 * @description Store de l'ensemble des organismes, nécessaire
 * puisque l'API ne propose aucun endpoint pour en
 * récupérer une facilement par son identifiant.
 */
const organizations: OrganizationStoreItem[] = [];

let fetchWrapper: FetchCallback = () => new Promise((resolve) => resolve(''));

export function getResponseAsArray<T>(response: T|T[]|undefined): T[] {
	if (!response) {
		return []
	}

	if (typeof response === 'object' && Array.isArray(response)) {
		return response;
	}

	return [response];
}

export function setFetchCallback(callback: FetchCallback) {
	fetchWrapper = callback;
}

export function setCredentials(appId: string, appKey: string): void {
	kAppId = appId;
	kAppKey = appKey;
}

export function getOrganizationsSize(): number {
	return organizations.length;
}

export function getOrganizations(): OrganizationStoreItem[] {
	return organizations;
}

export async function callAPI<T, P>(
	{
		endpoint,
		requestParameters = {},
		normalizationModel,
		rootKey
	}: FetchProperties<T,P>
): Promise<T|T[]|undefined> {
	try {
		const response = await makeRequest(endpoint, requestParameters);
		return deserializeObject<T, P>(response, normalizationModel, rootKey);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}
		return undefined;
	}
}

export function deserializeObject<T, P>(
	response: string,
	normalizationModel: Newable<T,P>,
	rootKey: string
): T[]|T|undefined {
	const xml = parser.parse(response) as DecodedXml;
	delete xml['?xml'];

	const isList = Object.hasOwn(xml, 'liste');

	if (!isList && !Object.hasOwn(xml, rootKey)) {
		throw new Error('The received response is a single object and does not contain the root key specified.');
	}

	if (isList && !Object.hasOwn(xml['liste'] as DecodedXml, rootKey)) {
		throw new Error('The received response is an array of objects, but does not contain the root key specified.');
	}

	let isSingleResult = true;

	if (isList) {
		isSingleResult = !Array.isArray((xml['liste'] as DecodedXml)[rootKey] as DecodedXml);
	}

	if (!isList) {
		return new normalizationModel(xml[rootKey] as unknown as unknown as P);
	}

	if (isList && isSingleResult) {
		const entryPath = ((xml['liste'] as DecodedXml)[rootKey] as DecodedXml) as unknown as P;
		return new normalizationModel(entryPath);
	}

	if (isList && !isSingleResult) {
		const entries = (xml['liste'] as DecodedXml)[rootKey] as DecodedXml[];
		return entries.map((entry) => new normalizationModel(entry as unknown as P));
	}

	return undefined;
}

export async function makeRequest(
	endpoint: ApiEndpoints,
	requestParameters: {[key: string]: string} = {}
): Promise<string> {
	const time = dayjs().format('YYYYDDMMHHmmss');
	const sha = new Sha('SHA-1', 'TEXT', {
		hmacKey: {
			value: md5(kAppKey),
			format: 'TEXT',
			// eslint-disable-next-line unicorn/text-encoding-identifier-case
			encoding: 'UTF8'
		},
		// eslint-disable-next-line unicorn/text-encoding-identifier-case
		encoding: 'UTF8',
	});
	sha.update(time);

	const baseParameters = {
		serie: kSerial,
		id: kAppId,
		tm: time,
		tmc: sha.getHMAC('HEX'),
	}

	const parameters = {...baseParameters, ...requestParameters};
	const searchParameters = new URLSearchParams();

	for (const [key, value] of Object.entries(parameters)) {
		searchParameters.set(key, String(value));
	}

	return fetchWrapper(kBaseUrl+endpoint, searchParameters);
}

export function mergeRankedAndSpidPlayerCollection(ranked: RankedPlayer[], spid: SpidPlayer[]): Player[] {
	if (ranked.length === 0 && spid.length === 0) {
		return [];
	}

	const rankedIndexed = new Map<string, RankedPlayer>();
	for (const r of ranked) {
		rankedIndexed.set(r.licence(), r);
	}

	const spidIndexed = new Map<string, SpidPlayer>();
	for (const s of spid) {
		spidIndexed.set(s.licence(), s);
	}

	const result = [];

	if (rankedIndexed.size > 0) {
		for (const [licence, player] of rankedIndexed.entries()) {
			if (spidIndexed.has(licence)) {
				result.push(new Player(player, spidIndexed.get(licence)))
				spidIndexed.delete(licence);
			} else {
				result.push(new Player(player, undefined))
			}
		}
	}

	if (spidIndexed.size > 0) {
		for (const [_, player] of spidIndexed.entries()) {
			result.push(new Player(undefined, player))
		}
	}

	return result;
}

export async function populateOrganizations(): Promise<void> {
	if (organizations.length > 0) {
		return;
	}

	await Promise.all(['F', 'Z', 'L', 'D'].map(async (type) => {
		const response = await callAPI<Organization, OrganizationConstructorProperties>({
			endpoint: ApiEndpoints.XML_ORGANISME,
			requestParameters: {
				type
			},
			normalizationModel: Organization,
			rootKey: 'organisme'
		}) as Organization|Organization[]|undefined;

		const normalizedOrgs = getResponseAsArray(response).map(org => org.normalize());
		organizations.push(...normalizedOrgs);
	}));
}

export function getOrganizationInStore(organizationId: number): Organization|undefined {
	const result = organizations.filter((o) => o.id === organizationId);
	if (result.length === 0) {
		return undefined;
	}

	return new Organization({
		id: result[0].id,
		code: result[0].code,
		libelle: result[0].name,
		idPere: result[0].parentId
	})
}
