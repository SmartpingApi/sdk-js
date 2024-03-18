import type { DateTime } from 'luxon';
import { BaseModel } from '@/models/base_model.js';
import { createDate } from '@/helpers/datetime_helpers.js'

type NewProperties = {
	nom: string;
	classement: number;
	epreuve: string;
	victoire: number;
	forfait: number;
	date: string;
}

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

	constructor (properties: NewProperties) {
		super();
		this.#opponentName = this.setOrFallback(properties.nom, '');
		this.#opponentPointsRank = this.setOrFallback(properties.classement, 0, Number);
		this.#contestName = this.setOrFallback(properties.epreuve, '');
		this.#isVictory = this.setOrFallback(properties.victoire, false, Boolean);
		this.#isForfeit = this.setOrFallback(properties.forfait, false, Boolean);
		this.#date = this.setOrFallback(properties.date, createDate(), (v) => createDate(v, 'DD/MM/YYYY'));
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
}
