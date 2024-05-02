import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	licence: string;
	nom: string;
	prenom: string;
	club: string;
	nclub: string;
	clast: number;
}

export class SmartpingRankedPlayer extends BaseModel {
	/** Numéro de licence */
	readonly #licence: string;

	/** Nom */
	readonly #lastname: string;

	/** Prénom */
	readonly #firstname: string;

	/** Nom du club */
	readonly #clubName: string;

	/** Numéro du club */
	readonly #clubCode: string;

	/** Classement officiel */
	readonly #pointsRank: number;

	constructor (properties: NewProperties) {
		super();
		this.#licence = this.setOrFallback(properties.licence, '');
		this.#lastname = this.setOrFallback(properties.nom, '');
		this.#firstname = this.setOrFallback(properties.prenom, '');
		this.#clubName = this.setOrFallback(properties.club, '');
		this.#clubCode = this.setOrFallback(properties.nclub, '');
		this.#pointsRank = this.setOrFallback(properties.clast, 0, Number);
	}

	public get licence() {
		return this.#licence;
	}

	public get lastname() {
		return this.#lastname;
	}

	public get firstname() {
		return this.#firstname;
	}

	public get clubName() {
		return this.#clubName;
	}

	public get clubCode() {
		return this.#clubCode;
	}

	public get pointsRank() {
		return this.#pointsRank;
	}
}
