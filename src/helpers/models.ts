import { XMLParser } from 'fast-xml-parser';

type DecodedXml = { [key: string]: string | number | DecodedXml | DecodedXml[] };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Newable<P> = new (properties: any) => P;

/** Parser utilisé pour désérialiser les modèles XML. */
const parser = new XMLParser();

export function deserializeObject<T>(
	response: string,
	normalizationModel: Newable<T>,
	rootKey: string,
	additionalProperties?: Record<string, unknown>,
) {
	const xml = parser.parse(response) as DecodedXml;
	delete xml['?xml'];

	const properties = {};

	if (undefined !== additionalProperties) {
		Object.assign(properties, {
			extras: additionalProperties,
		});
	}

	if (rootKey === 'liste') {
		return new normalizationModel(Object.assign(properties,xml[rootKey]));
	}

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
		return new normalizationModel(Object.assign(properties,xml[rootKey]));
	}

	if (isList && isSingleResult) {
		const entryPath = ((xml['liste'] as DecodedXml)[rootKey] as DecodedXml);
		return new normalizationModel(Object.assign(properties,entryPath));
	}

	if (isList && !isSingleResult) {
		const entries = (xml['liste'] as DecodedXml)[rootKey] as DecodedXml[];
		return entries.map((entry) => new normalizationModel(Object.assign(properties,entry)));
	}

	throw new Error('Received items should be an array or a single object.');
}

export function getResponseAsArray<T>(response: T | T[]) {
	if (!response) {
		return [];
	}

	return Array.isArray(response) ? response : [response];
}
