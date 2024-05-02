import type { DateTime } from 'luxon';

import { createDate } from '#src/helpers/datetime_helpers.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingRankedGame } from '#src/models/player/ranked_game.js';
import type { SmartpingSPIDGame } from '#src/models/player/spid_game.js';

export class SmartpingGame extends BaseModel {
	/** ID de la partie */
	readonly #id: number | undefined;

	/** Numéro de licence */
	readonly #licence: string | undefined;

	/** Numéro de licence de l'adversaire */
	readonly #opponentLicence: string | undefined;

	/** Victoire */
	readonly #isVictory: boolean;

	/** Numéro de tour */
	readonly #roundIndex: number | undefined;

	/** ID de l'épreuve */
	readonly #contestId: number | undefined;

	/** Date de la partie */
	readonly #date: DateTime;

	/** Genre de l'adversaire */
	readonly #opponentGender: string | undefined;

	/** Nom de l'adversaire */
	readonly #opponentName: string;

	/** Points obtenus */
	readonly #pointsEarned: number | undefined;

	/** Coefficient de l'épreuve */
	readonly #contestCoefficient: number | undefined;

	/** Classement officiel de l'adversaire */
	readonly #opponentPointsRank: number;

	/** Nom de l'épreuve */
	readonly #contestName: string | undefined;

	/** Forfait */
	readonly #isForfeit: boolean | undefined;

	constructor (rankedGame?: SmartpingRankedGame, SPIDGame?: SmartpingSPIDGame) {
		super();

		this.#date = createDate();
		this.#isVictory = false;
		this.#opponentName = '';
		this.#opponentPointsRank = 0;

		if (undefined !== rankedGame) {
			this.#id = rankedGame.id;
			this.#licence = rankedGame.licence;
			this.#opponentLicence = rankedGame.opponentLicence;
			this.#isVictory = rankedGame.isVictory;
			this.#roundIndex = rankedGame.roundIndex;
			this.#contestId = rankedGame.contestId;
			this.#date = rankedGame.date;
			this.#opponentGender = rankedGame.opponentGender;
			this.#opponentName = rankedGame.opponentName;
			this.#pointsEarned = rankedGame.pointsEarned;
			this.#contestCoefficient = rankedGame.contestCoefficient;
			this.#opponentPointsRank = rankedGame.opponentPointsRank;
		}

		if (undefined !== SPIDGame) {
			this.#opponentName = SPIDGame.opponentName;
			this.#opponentPointsRank = SPIDGame.opponentPointsRank;
			this.#contestName = SPIDGame.contestName;
			this.#isVictory = SPIDGame.isVictory;
			this.#isForfeit = SPIDGame.isForfeit;
			this.#date = SPIDGame.date;
		}
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

	public get contestName() {
		return this.#contestName;
	}

	public get isForfeit() {
		return this.#isForfeit;
	}
}
