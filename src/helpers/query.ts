import { default as Sha } from 'jssha/sha1';
import md5 from 'md5';

import type { ApiEndpoint } from '#src/api_endpoints.js';
import { type CacheValue, ms, oneHour, storage } from '#src/helpers/cache.js';
import { createDate } from '#src/helpers/datetime_helpers.js';
import type { Newable } from '#src/serializers/serializer_interface.js';
import type { SmartpingContext } from '#src/smartping.js';

interface CacheOptions {
	key: string;
	ttl?: string;
}

interface FetchProperties<P> {
	endpoint: ApiEndpoint;
	normalizationModel: Newable<P>;
	rootKey: string;
	cache: false | CacheOptions;
	context: SmartpingContext;
	requestParameters?: (search: URLSearchParams) => void;
	asArray?: boolean;
	additionalProperties?: Record<string, unknown>;
}

interface RequestProperties {
	endpoint: ApiEndpoint;
	requestParameters?: (search: URLSearchParams) => void;
	cache:
		| false
		| {
				key: string;
				ttl?: string;
		  };
}

export interface QueryOptions {
	disableCache?: boolean;
}

export default abstract class Query {
	readonly #credentials: SmartpingContext['credentials'];
	readonly #errorReporter: SmartpingContext['errorReporter'];
	readonly #fetch: SmartpingContext['fetcher'];
	readonly #serializer: SmartpingContext['serializer'];
	#queryOptions: QueryOptions | undefined;

	protected constructor(context: SmartpingContext) {
		this.#credentials = context.credentials;
		this.#errorReporter = context.errorReporter;
		this.#fetch = context.fetcher;
		this.#serializer = context.serializer;
	}

	public withOptions(options?: QueryOptions) {
		this.#queryOptions = options;

		return this;
	}

	protected async callAPI<T>(options: FetchProperties<T>): Promise<Array<T>>;
	protected async callAPI<T>(
		options: FetchProperties<T>,
		singleResultExpected: true,
	): Promise<T | undefined>;
	protected async callAPI<T>(
		options: FetchProperties<T>,
		singleResultExpected?: boolean,
	): Promise<T | Array<T> | undefined> {
		const { context, normalizationModel, rootKey, additionalProperties } = options;

		try {
			const response = await this.#makeRequest(options);

			if (response === undefined) {
				return singleResultExpected ? undefined : [];
			}

			const deserialized = this.#serializer.deserialize<T>({
				context,
				response,
				rootKey,
				normalizationModel,
				additionalProperties: additionalProperties ?? {},
			});

			return singleResultExpected ? deserialized : this.#getResponseAsArray(deserialized);
		} catch (error) {
			this.#errorReporter.report(error);

			return singleResultExpected ? undefined : [];
		}
	}

	#generateSha(time: string) {
		const sha = new Sha('SHA-1', 'TEXT', {
			hmacKey: {
				value: md5(this.#credentials.appKey),
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

	#canBeCached(cacheOptions: CacheOptions | false): cacheOptions is CacheOptions {
		if (this.#queryOptions && this.#queryOptions.disableCache) {
			return false;
		}

		if (!cacheOptions) {
			return false;
		}

		return storage.has(cacheOptions.key);
	}

	async #makeRequest(options: RequestProperties): Promise<CacheValue | undefined> {
		if (this.#canBeCached(options.cache)) {
			return storage.get(options.cache.key);
		}

		const currentTime = createDate().toFormat('yyyyddLLHHmmss');
		const sha = this.#generateSha(currentTime);

		const requestParameters = new URLSearchParams({
			serie: this.#credentials.serial,
			id: this.#credentials.appId,
			tm: currentTime,
			tmc: sha.getHMAC('HEX'),
		});

		if (options.requestParameters) {
			options.requestParameters(requestParameters);
		}

		const response = await this.#fetch(this.#credentials.baseUrl + options.endpoint, {
			method: 'GET',
			throwHttpErrors: false,
			credentials: 'omit',
			redirect: 'follow',
			searchParams: requestParameters,
		});

		const buffer = await response.arrayBuffer();
		const responseValue = {
			url: response.url,
			payload: buffer,
		};

		if (this.#canBeCached(options.cache)) {
			let cacheOptions = undefined;

			if (options.cache.ttl) {
				cacheOptions = {
					ttl: ms(options.cache.ttl) ?? oneHour,
				};
			}

			storage.set(options.cache.key, responseValue, cacheOptions);
		}

		return responseValue;
	}

	#getResponseAsArray<T>(response: T | Array<T>) {
		if (!response) {
			return [];
		}

		return Array.isArray(response) ? response : [response];
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract run(...args: Array<any>): Promise<any>;
}
