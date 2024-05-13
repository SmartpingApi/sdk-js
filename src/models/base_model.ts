import type { DateTime } from 'luxon';
import type { Primitive } from 'type-fest';

type AuthorizedPrimitive = undefined | string | number | boolean | DateTime;

type PreloadMethod = () => Promise<void>;
export type Preloads<T extends string> = Record<T, PreloadMethod>;

export abstract class BaseModel {
	protected setOrFallback<T extends Primitive, U extends AuthorizedPrimitive>(
		value: T,
		nullishValue: U,
		definedValue?: U | ((value: T) => U),
	): U {
		if (this.isEmpty(value)) {
			return nullishValue;
		}

		if (typeof definedValue === 'function') {
			return definedValue(value) as unknown as U;
		}

		return definedValue ?? (value as unknown as U);
	}

	protected isEmpty(value: unknown): boolean {
		return value === undefined || value === null || value === '';
	}

	protected async preloadRelations<T extends string>(
		relations: Array<T> | '*',
		getters: Preloads<T>,
	) {
		if (relations === '*') {
			await Promise.all(Object.values<PreloadMethod>(getters).map((getter) => getter()));

			return;
		}

		const toExecute: Array<PreloadMethod> = [];

		for (const relation of relations) {
			if (relation in getters) {
				toExecute.push(getters[relation]);
			}
		}

		await Promise.all(toExecute.map((getter) => getter()));
	}
}
