import { SmartpingObject } from '../smartping-object'
import RankedGame from './ranked-game'
import SpidGame from './spid-game'
import { createDate } from '../../helpers/datetime-helpers'
import PlayerApi from '../../services/player-api'
import RankedPlayer from './ranked-player'

export default class Game extends SmartpingObject {
	readonly #id?: number;
	readonly #licence?: string;
	readonly #opponentLicence?: string;
	readonly #isVictory: boolean;
	readonly #roundIndex?: number;
	readonly #contestCode?: number;
	readonly #date: Date;
	readonly #opponentGender?: string;
	readonly #opponentName: string;
	readonly #pointsEarned?: number;
	readonly #contestCoefficient?: number;
	readonly #opponentPointsRank: number;
	readonly #contestName?: string;
	readonly #isForfeit?: boolean;

	constructor (ranked?: RankedGame, spid?: SpidGame) {
		super();

		this.#date = createDate();
		this.#isVictory = false;
		this.#opponentName = '';
		this.#opponentPointsRank = 0;

		if (ranked) {
			this.#id = ranked.id();
			this.#licence = ranked.licence();
			this.#opponentLicence = ranked.opponentLicence();
			this.#isVictory = ranked.isVictory();
			this.#roundIndex = ranked.roundIndex();
			this.#contestCode = ranked.contestCode();
			this.#date = ranked.date();
			this.#opponentGender = ranked.opponentGender();
			this.#opponentName = ranked.opponentName();
			this.#pointsEarned = ranked.pointsEarned();
			this.#contestCoefficient = ranked.contestCoefficient();
			this.#opponentPointsRank = ranked.opponentPointsRank();
		}

		if (spid) {
			this.#opponentName = spid.opponentName();
			this.#opponentPointsRank = spid.opponentPointsRank();
			this.#contestName = spid.contestName();
			this.#isVictory = spid.isVictory();
			this.#isForfeit = spid.isForfeit();
			this.#date = spid.date();
		}
	}

	public id(): number|undefined {
		return this.#id;
	}

	public licence(): string|undefined {
		return this.#licence;
	}

	public opponentLicence(): string|undefined {
		return this.#opponentLicence;
	}

	public isVictory(): boolean {
		return this.#isVictory;
	}

	public roundIndex(): number|undefined {
		return this.#roundIndex;
	}

	public contestCode(): number|undefined {
		return this.#contestCode;
	}

	public date(): Date {
		return this.#date;
	}

	public opponentGender(): string|undefined {
		return this.#opponentGender;
	}

	public opponentName(): string {
		return this.#opponentName;
	}

	public pointsEarned(): number|undefined {
		return this.#pointsEarned;
	}

	public contestCoefficient(): number|undefined {
		return this.#contestCoefficient;
	}

	public opponentPointsRank(): number|undefined {
		return this.#opponentPointsRank;
	}

	public contestName(): string|undefined {
		return this.#contestName;
	}

	public isForfeit(): boolean|undefined {
		return this.#isForfeit;
	}

	public async player(): Promise<RankedPlayer|undefined> {
		if (!this.#licence) {
			// eslint-disable-next-line unicorn/no-useless-undefined
			return new Promise(resolve => resolve(undefined));
		}

		return PlayerApi.getPlayerOnRankingBase(this.#licence);
	}

	public async opponent(): Promise<RankedPlayer|undefined> {
		if (!this.#opponentLicence) {
			// eslint-disable-next-line unicorn/no-useless-undefined
			return new Promise(resolve => resolve(undefined));
		}

		return PlayerApi.getPlayerOnRankingBase(this.#opponentLicence);
	}
}
