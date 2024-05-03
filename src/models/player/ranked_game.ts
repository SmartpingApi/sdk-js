import type { DateTime } from 'luxon';

import {
	createDate,
	nonNullableDateFactory,
	stringifyDate,
} from '#src/helpers/datetime_helpers.js';
import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	idpartie: string;
	licence: string;
	advlic: string;
	vd: string;
	numjourn: string;
	codechamp: string;
	date: string;
	advsexe: string;
	advnompre: string;
	pointres: string;
	coefchamp: string;
	advclaof: string;
};

export class SmartpingRankedGame extends BaseModel {
	/** ID de la partie */
	readonly #id: number;

	/** Numéro de licence */
	readonly #licence: string;

	/** Numéro de licence de l'adversaire */
	readonly #opponentLicence: string;

	/** Victoire */
	readonly #isVictory: boolean;

	/** Numéro de tour */
	readonly #roundIndex: number;

	/** ID de l'épreuve */
	readonly #contestId: number;

	/** Date de la partie */
	readonly #date: DateTime;

	/** Genre de l'adversaire */
	readonly #opponentGender: string;

	/** Nom de l'adversaire */
	readonly #opponentName: string;

	/** Points obtenus */
	readonly #pointsEarned: number;

	/** Coefficient de l'épreuve */
	readonly #contestCoefficient: number;

	/** Classement officiel de l'adversaire */
	readonly #opponentPointsRank: number;

	constructor(properties: NewProperties) {
		super();
		this.#id = this.setOrFallback(properties.idpartie, 0, Number);
		this.#licence = this.setOrFallback(properties.licence, '');
		this.#opponentLicence = this.setOrFallback(properties.advlic, '');
		this.#isVictory = this.setOrFallback(properties.vd, false, Boolean);
		this.#roundIndex = this.setOrFallback(properties.numjourn, 0, Number);
		this.#contestId = this.setOrFallback(properties.codechamp, 0, Number);
		this.#date = this.setOrFallback(properties.date, createDate(), nonNullableDateFactory());
		this.#opponentGender = this.setOrFallback(properties.advsexe, '');
		this.#opponentName = this.setOrFallback(properties.advnompre, '');
		this.#pointsEarned = this.setOrFallback(properties.pointres, 0, Number);
		this.#contestCoefficient = this.setOrFallback(properties.coefchamp, 0, Number);
		this.#opponentPointsRank = this.setOrFallback(properties.advclaof, 0, Number);
	}

	public get id() {
		return this.#id;
	}

	public get licence() {
		return this.#licence;
	}

	public get opponentLicence() {
		return this.#opponentLicence;
	}

	public get isVictory() {
		return this.#isVictory;
	}

	public get roundIndex() {
		return this.#roundIndex;
	}

	public get contestId() {
		return this.#contestId;
	}

	public get date() {
		return this.#date;
	}

	public get opponentGender() {
		return this.#opponentGender;
	}

	public get opponentName() {
		return this.#opponentName;
	}

	public get pointsEarned() {
		return this.#pointsEarned;
	}

	public get contestCoefficient() {
		return this.#contestCoefficient;
	}

	public get opponentPointsRank() {
		return this.#opponentPointsRank;
	}

	public serialize() {
		return {
			id: this.#id,
			licence: this.#licence,
			opponentLicence: this.#opponentLicence,
			isVictory: this.#isVictory,
			roundIndex: this.#roundIndex,
			contestId: this.#contestId,
			date: stringifyDate(this.#date),
			opponentGender: this.#opponentGender,
			opponentName: this.#opponentName,
			pointsEarned: this.#pointsEarned,
			contestCoefficient: this.#contestCoefficient,
			opponentPointsRank: this.#opponentPointsRank,
		};
	}
}
