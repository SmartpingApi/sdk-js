import type { CacheValue } from '#src/helpers/cache.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Newable<P> = new (properties: any) => P;

export interface DeserializationOptions<Model> {
	response: CacheValue,
	normalizationModel: Newable<Model>,
	rootKey: string,
	additionalProperties?: Record<string, unknown>;
}

export interface SerializerInterface {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	deserialize<Model>(options: DeserializationOptions<Model>): Model | Array<Model>;
}
