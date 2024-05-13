import type { DateTime } from 'luxon';

import {
	createDate,
	nonNullableDateFactory,
	stringifyDate,
} from '#src/helpers/datetime_helpers.js';
import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	nom: string;
	classement: string;
	epreuve: string;
	victoire: string;
	forfait: string;
	date: string;
	idpartie: string;
	coefchamp: string;
};

export class SmartpingSPIDGame extends BaseModel {
	/** Nom de l'adversaire */
	readonly #opponentName: string;

	/** Classement officiel de l'adversaire */
	readonly #opponentPointsRank: number;

	/** Nom de l'épreuve */
	readonly #contestName: string;

	/** Victoire */
	readonly #isVictory: boolean;

	/** Forfait */
	readonly #isForfeit: boolean;

	/** Date de la partie */
	readonly #date: DateTime;

	/** Coefficient de la partie */
	readonly #gameCoefficient: number;

	/** Identifiant de la partie */
	readonly #gameId: number;

	constructor(properties: NewProperties) {
		super();
		this.#opponentName = this.setOrFallback(properties.nom, '');
		this.#opponentPointsRank = this.setOrFallback(properties.classement, 0, Number);
		this.#contestName = this.setOrFallback(properties.epreuve, '');
		this.#isVictory = this.setOrFallback(properties.victoire, false, (value) => value === 'V');
		this.#isForfeit = this.setOrFallback(properties.forfait, false, (value) => value === '1');
		this.#date = this.setOrFallback(properties.date, createDate(), nonNullableDateFactory());
		this.#gameCoefficient = this.setOrFallback(properties.coefchamp, 0, Number);
		this.#gameId = this.setOrFallback(properties.idpartie, 0, Number);
	}

	public get opponentName() {
		return this.#opponentName;
	}

	public get opponentPointsRank() {
		return this.#opponentPointsRank;
	}

	public get contestName() {
		return this.#contestName;
	}

	public get isVictory() {
		return this.#isVictory;
	}

	public get isForfeit() {
		return this.#isForfeit;
	}

	public get date() {
		return this.#date;
	}

	public get gameCoefficient() {
		return this.#gameCoefficient;
	}

	public get gameId() {
		return this.#gameId;
	}

	public serialize() {
		return {
			opponentName: this.opponentName,
			opponentPointsRank: this.opponentPointsRank,
			contestName: this.contestName,
			isVictory: this.isVictory,
			isForfeit: this.isForfeit,
			date: stringifyDate(this.date),
			gameCoefficient: this.gameCoefficient,
			gameId: this.gameId,
		};
	}
}
