import type { Newable } from '@/helpers/models.js';
import { deserializeObject, getResponseAsArray } from '@/helpers/models.js';
import ky from 'ky';
import md5 from 'md5';
import { default as Sha } from 'jssha/sha1';
import { ApiEndpoints } from '@/api_endpoints.js';
import { Credentials } from '@/config.js';
import { createDate } from '@/helpers/datetime_helpers.js';
import { ms, storage } from '@/helpers/cache.js';

type FetchProperties<P> = {
	endpoint: ApiEndpoints;
	normalizationModel: Newable<P>;
	rootKey: string;
	cache: false | {
		key: string;
		ttl?: string;
	};
	requestParameters?: (search: URLSearchParams) => void;
	asArray?: boolean;
	additionalProperties?: Record<string, unknown>;
};

function generateSha(time: string) {
	const sha = new Sha('SHA-1', 'TEXT', {
		hmacKey: {
			value: md5(Credentials.appKey),
			format: 'TEXT',
			// eslint-disable-next-line unicorn/text-encoding-identifier-case
			encoding: 'UTF8',
		},
		// eslint-disable-next-line unicorn/text-encoding-identifier-case
		encoding: 'UTF8',
	});
	sha.update(time);

	return sha;
}

type RequestProperties = {
	endpoint: ApiEndpoints;
	requestParameters?: (search: URLSearchParams) => void;
	cache: false | {
		key: string;
		ttl?: string;
	};
}

async function makeRequest(options: RequestProperties) {
	if (options.cache && storage.has(options.cache.key)) {
		return storage.get(options.cache.key);
	}

	const currentTime = createDate().toFormat('yyyyddLLHHmmss');
	const sha = generateSha(currentTime);

	const requestParameters = new URLSearchParams({
		serie: Credentials.serial,
		id: Credentials.appId,
		tm: currentTime,
		tmc: sha.getHMAC('HEX'),
	});

	if (options.requestParameters) {
		options.requestParameters(requestParameters);
	}

	const response = await ky(Credentials.baseUrl + options.endpoint, {
		method: 'GET',
		throwHttpErrors: false,
		credentials: 'omit',
		redirect: 'follow',
		searchParams: requestParameters,
	}).text();

	if (options.cache) {
		storage.set(
			options.cache.key,
			response,
			options.cache.ttl ?
				{ ttl: ms(options.cache.ttl) ?? 1000 * 60 * 60 }
				: undefined
		);
	}

	return response;
}

export async function callAPI<T>(options: FetchProperties<T>, singleResult?: false): Promise<T[]>;
export async function callAPI<T>(options: FetchProperties<T>, singleResult?: true): Promise<T | undefined>;
export async function callAPI<T>(options: FetchProperties<T>, singleResult?: boolean): Promise<T | T[] | undefined> {
	try {
		const response = await makeRequest(options);

		if (response === undefined) {
			return true === singleResult ? undefined : [];
		}

		const deserialized = deserializeObject<T>(
			response,
			options.normalizationModel,
			options.rootKey,
			options.additionalProperties,
		);

		return true === singleResult ? deserialized : getResponseAsArray(deserialized);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}

		return true === singleResult ? undefined : [];
	}
}
