import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	licence: string;
	nom: string;
	prenom: string;
	club: string;
	nclub: string;
	clast: string;
	sexe: string;
	echelon: string;
	place: string;
	points: string;
};

export class SmartpingSPIDPlayer extends BaseModel {
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

	/** Genre */
	readonly #gender: string;

	/** "N" si numéroté */
	readonly #level: string;

	/** Place si numéroté */
	readonly #place: number;

	/** Points officiels */
	readonly #points: number;

	constructor(properties: NewProperties) {
		super();
		this.#licence = this.setOrFallback(properties.licence, '');
		this.#lastname = this.setOrFallback(properties.nom, '');
		this.#firstname = this.setOrFallback(properties.prenom, '');
		this.#clubName = this.setOrFallback(properties.club, '');
		this.#clubCode = this.setOrFallback(properties.nclub, '');
		this.#pointsRank = this.setOrFallback(properties.clast, 0, Number);
		this.#gender = this.setOrFallback(properties.sexe, '');
		this.#level = this.setOrFallback(properties.echelon, '');
		this.#place = this.setOrFallback(properties.place, 0, Number);
		this.#points = this.setOrFallback(properties.points, 0, Number);
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

	public get gender() {
		return this.#gender;
	}

	public get level() {
		return this.#level;
	}

	public get place() {
		return this.#place;
	}

	public get points() {
		return this.#points;
	}

	public get fullName() {
		return `${this.firstname} ${this.lastname.toLocaleUpperCase('fr-FR')}`;
	}

	public serialize() {
		return {
			licence: this.#licence,
			nom: this.#lastname,
			prenom: this.#firstname,
			club: this.#clubName,
			nclub: this.#clubCode,
			clast: this.#pointsRank,
			sexe: this.#gender,
			echelon: this.#level,
			place: this.#place,
			points: this.#points,
		};
	}
}
