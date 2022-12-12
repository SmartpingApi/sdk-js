import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'
import { createDate } from '../../helpers/datetime-helpers'
import RankedPlayer from './ranked-player'
import PlayerApi from '../../services/player-api'

export interface RankedGameConstructorProperties {
	idpartie: number
	licence: string
	advlic: string
	vd: number
	numjourn: number
	codechamp: number
	date: string
	advsexe: string
	advnompre: string
	pointres: number
	coefchamp: number
	advclaof: number
}

export default class RankedGame extends SmartpingObject {
	readonly #id: number;
	readonly #licence: string;
	readonly #opponentLicence: string;
	readonly #isVictory: boolean;
	readonly #roundIndex: number;
	readonly #contestCode: number;
	readonly #date: Date;
	readonly #opponentGender: string;
	readonly #opponentName: string;
	readonly #pointsEarned: number;
	readonly #contestCoefficient: number;
	readonly #opponentPointsRank: number;

	constructor (properties: RankedGameConstructorProperties) {
		super();

		this.#id = isEmpty(properties.idpartie) ? 0 : properties.idpartie;
		this.#licence = isEmpty(properties.licence) ? '' : properties.licence;
		this.#opponentLicence = isEmpty(properties.advlic) ? '' : properties.advlic;
		this.#isVictory = isEmpty(properties.vd) ? false : Boolean(properties.vd);
		this.#roundIndex = isEmpty(properties.numjourn) ? 0 : properties.numjourn;
		this.#contestCode = isEmpty(properties.codechamp) ? 0 : properties.codechamp;
		this.#date = isEmpty(properties.date) ? createDate() : createDate(properties.date, 'DD/MM/YYYY');
		this.#opponentGender = isEmpty(properties.advsexe) ? '' : properties.advsexe;
		this.#opponentName = isEmpty(properties.advnompre) ? '' : properties.advnompre;
		this.#pointsEarned = isEmpty(properties.pointres) ? 0 : properties.pointres;
		this.#contestCoefficient = isEmpty(properties.coefchamp) ? 0 : properties.coefchamp;
		this.#opponentPointsRank = isEmpty(properties.advclaof) ? 0 : properties.advclaof;
	}

	public id(): number {
		return this.#id;
	}

	public licence(): string {
		return this.#licence;
	}

	public opponentLicence(): string {
		return this.#opponentLicence;
	}

	public isVictory(): boolean {
		return this.#isVictory;
	}

	public roundIndex(): number {
		return this.#roundIndex;
	}

	public contestCode(): number {
		return this.#contestCode;
	}

	public date(): Date {
		return this.#date;
	}

	public opponentGender(): string {
		return this.#opponentGender;
	}

	public opponentName(): string {
		return this.#opponentName;
	}

	public pointsEarned(): number {
		return this.#pointsEarned;
	}

	public contestCoefficient(): number {
		return this.#contestCoefficient;
	}

	public opponentPointsRank(): number {
		return this.#opponentPointsRank;
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
