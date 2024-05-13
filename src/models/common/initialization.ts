import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	appli: number;
};

export class SmartpingInitialization extends BaseModel {
	/** Autorisation d'accès à l'application */
	readonly #authorized: boolean;

	constructor(properties: NewProperties) {
		super();
		this.#authorized = this.setOrFallback(properties.appli, false, Boolean);
	}

	public get authorized() {
		return this.#authorized;
	}

	public serialize() {
		return {
			authorized: this.#authorized,
		};
	}
}
