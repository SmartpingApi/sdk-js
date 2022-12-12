import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'
import PlayerDetails from './player-details'
import PlayerApi from '../../services/player-api'

export interface SpidPlayerConstructorProperties {
	licence: string;
	nom: string;
	prenom: string;
	club: string;
	nclub: string;
	clast: number;
	sexe: string;
	echelon: string;
	place: number;
	points: number;
}

export interface SpidPlayerExportProperties {
	licence: string;
	lastname: string;
	firstname: string;
	clubName: string;
	clubCode: string;
	pointsRank: number;
	gender: string;
	level: string;
	place: number;
	points: number;
}

export default class SpidPlayer extends SmartpingObject {
	readonly #licence: string;
	readonly #lastname: string;
	readonly #firstname: string;
	readonly #clubName: string;
	readonly #clubCode: string;
	readonly #pointsRank: number;
	readonly #gender: string;
	readonly #level: string;
	readonly #place: number;
	readonly #points: number;

	constructor (properties: SpidPlayerConstructorProperties) {
		super();

		this.#licence = isEmpty(properties.licence) ? '' : properties.licence;
		this.#lastname = isEmpty(properties.nom) ? '' : properties.nom;
		this.#firstname = isEmpty(properties.prenom) ? '' : properties.prenom;
		this.#clubName = isEmpty(properties.club) ? '' : properties.club;
		this.#clubCode = isEmpty(properties.nclub) ? '' : properties.nclub;
		this.#pointsRank = isEmpty(properties.clast) ? 0 : Number(properties.clast);
		this.#gender = isEmpty(properties.sexe) ? '' : properties.sexe;
		this.#level = isEmpty(properties.echelon) ? '' : properties.echelon;
		this.#place = isEmpty(properties.place) ? 0 : Number(properties.place);
		this.#points = isEmpty(properties.points) ? 0 : Number(properties.points);
	}

	public licence(): string {
		return this.#licence;
	}

	public lastname(): string {
		return this.#lastname;
	}

	public firstname(): string {
		return this.#firstname;
	}

	public clubName(): string {
		return this.#clubName;
	}

	public clubCode(): string {
		return this.#clubCode;
	}

	public pointsRank(): number {
		return this.#pointsRank;
	}

	public gender(): string {
		return this.#gender;
	}

	public level(): string {
		return this.#level;
	}

	public place(): number {
		return this.#place;
	}

	public points(): number {
		return this.#points;
	}

	public async details(): Promise<PlayerDetails|undefined> {
		return PlayerApi.getPlayer(this.#licence);
	}

	public normalize(): SpidPlayerExportProperties {
		return {
			licence: this.#licence,
			lastname: this.#lastname,
			firstname: this.#firstname,
			clubName: this.#clubName,
			clubCode: this.#clubCode,
			pointsRank: this.#pointsRank,
			gender: this.#gender,
			level: this.#level,
			place: this.#place,
			points: this.#points,
		};
	}
}
