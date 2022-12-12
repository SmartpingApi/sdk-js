import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'
import { createDate } from '../../helpers/datetime-helpers'

export interface SpidGameConstructorProperties {
	nom: string;
	classement: number;
	epreuve: string;
	victoire: number;
	forfait: number;
	date: string;
}

export default class SpidGame extends SmartpingObject {
	readonly #opponentName: string;
	readonly #opponentPointsRank: number;
	readonly #contestName: string;
	readonly #isVictory: boolean;
	readonly #isForfeit: boolean;
	readonly #date: Date;

	constructor (properties: SpidGameConstructorProperties) {
		super();

		this.#opponentName = isEmpty(properties.nom) ? '' : properties.nom;
		this.#opponentPointsRank = isEmpty(properties.classement) ? 0 : Number(properties.classement);
		this.#contestName = isEmpty(properties.epreuve) ? '' : properties.epreuve;
		this.#isVictory = isEmpty(properties.victoire) ? false : Boolean(properties.victoire);
		this.#isForfeit = isEmpty(properties.forfait) ? false : Boolean(properties.forfait);
		this.#date = isEmpty(properties.date) ? createDate() : createDate(properties.date, 'DD/MM/YYYY');
	}

	public opponentName(): string {
		return this.#opponentName;
	}

	public opponentPointsRank(): number {
		return this.#opponentPointsRank;
	}

	public contestName(): string {
		return this.#contestName;
	}

	public isVictory(): boolean {
		return this.#isVictory;
	}

	public isForfeit(): boolean {
		return this.#isForfeit;
	}

	public date(): Date {
		return this.#date;
	}
}
