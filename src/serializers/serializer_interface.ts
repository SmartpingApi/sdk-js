import type { CacheValue } from '#src/helpers/cache.js';
import type { SmartpingContext } from '#src/smartping.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Newable<P> = new (properties: any, context: SmartpingContext) => P;

export interface DeserializationOptions<Model> {
	response: CacheValue;
	normalizationModel: Newable<Model>;
	rootKey: string;
	context: SmartpingContext;
	additionalProperties?: Record<string, unknown>;
}

export interface SerializerInterface {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	deserialize<Model>(options: DeserializationOptions<Model>): Model | Array<Model>;
}
