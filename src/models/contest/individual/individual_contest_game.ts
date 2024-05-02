import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	libelle: string;
	vain: string;
	perd: string;
	forfait: string;
};

export class SmartpingIndividualContestGame extends BaseModel {
	/** Échelon dans la compétition */
	readonly #name: string;

	/** Vainqueur */
	readonly #winner: string;

	/** Perdant */
	readonly #loser: string | undefined;

	/** Forfait */
	readonly #forfeit: string | undefined;

	constructor(properties: NewProperties) {
		super();
		this.#name = this.setOrFallback(properties.libelle, '');
		this.#winner = this.setOrFallback(properties.vain, '');
		this.#loser = this.setOrFallback(properties.perd, undefined);
		this.#forfeit = this.setOrFallback(properties.forfait, undefined);
	}

	public get name() {
		return this.#name;
	}

	public get winner() {
		return this.#winner;
	}

	public get loser() {
		return this.#loser;
	}

	public get forfeit() {
		return this.#forfeit;
	}

	public serialize() {
		return {
			name: this.#name,
			winner: this.#winner,
			loser: this.#loser,
			forfeit: this.#forfeit,
		};
	}
}
