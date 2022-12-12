import { SmartpingObject } from '../smartping-object'
import RankedPlayer from './ranked-player'
import SpidPlayer from './spid-player'
import { isEmpty } from '../../helpers/validation'

export interface PlayerExportProperties {
	licence: string;
	lastname: string;
	firstname: string;
	clubName: string;
	clubCode: string;
	gender: string|undefined;
	level: string|undefined;
	place: number|undefined;
	points: number|undefined;
	pointsRank: number|undefined;
}

export default class Player extends SmartpingObject {
	readonly #licence: string;
	readonly #lastname: string;
	readonly #firstname: string;
	readonly #clubName: string;
	readonly #clubCode: string;
	readonly #gender?: string;
	readonly #level?: string;
	readonly #place?: number;
	readonly #points?: number;
	readonly #pointsRank?: number;

	constructor (ranked?: RankedPlayer, spid?: SpidPlayer) {
		super();

		this.#licence = spid?.licence() ?? ranked?.licence() ?? '';
		this.#firstname = spid?.firstname() ?? ranked?.firstname() ?? '';
		this.#lastname = spid?.lastname() ?? ranked?.lastname() ?? '';
		this.#clubName = spid?.clubName() ?? ranked?.clubName() ?? '';
		this.#clubCode = spid?.clubCode() ?? ranked?.clubCode() ?? '';
		this.#gender = (spid && (spid.gender() === 'H' || spid.gender() === 'F')) ? spid.gender() : undefined;
		this.#level = spid && !isEmpty(spid.level()) ? spid.level() : undefined;
		this.#place = spid && !isEmpty(spid.place()) ? spid.place() : undefined;
		this.#points = spid && !isEmpty(spid.points()) ? spid.points() : undefined;
		this.#pointsRank = ranked?.pointsRank();
	}

	public licence(): string {
		return this.#licence;
	}

	public firstname(): string {
		return this.#firstname;
	}

	public lastname(): string {
		return this.#lastname;
	}

	public clubName(): string {
		return this.#clubName;
	}

	public clubCode(): string {
		return this.#clubCode;
	}

	public gender(): string|undefined {
		return this.#gender;
	}

	public level(): string|undefined {
		return this.#level;
	}

	public place(): number|undefined {
		return this.#place;
	}

	public points(): number|undefined {
		return this.#points;
	}

	public pointsRank(): number|undefined {
		return this.#pointsRank;
	}

	public normalize(): PlayerExportProperties {
		return {
			licence: this.#licence,
			firstname: this.#firstname,
			lastname: this.#lastname,
			clubName: this.#clubName,
			clubCode: this.#clubCode,
			gender: this.#gender,
			level: this.#level,
			place: this.#place,
			points: this.#points,
			pointsRank: this.#pointsRank,
		};
	}
}
