import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	iddivision: string;
	libelle: string;
};

export class SmartpingDivision extends BaseModel {
	/** ID interne pour la Fédération */
	readonly #id: number;

	/** Nom */
	readonly #name: string;

	constructor(properties: NewProperties) {
		super();
		this.#id = this.setOrFallback(properties.iddivision, 0, Number);
		this.#name = this.setOrFallback(properties.libelle, '');
	}

	public get id() {
		return this.#id;
	}

	public get name() {
		return this.#name;
	}

	public serialize() {
		return {
			id: this.#id,
			name: this.#name,
		};
	}
}
