import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'
import PlayerDetails from './player-details'
import PlayerApi from '../../services/player-api'

export interface RankedPlayerConstructorProperties {
	licence: string;
	nom: string;
	prenom: string;
	club: string;
	nclub: string;
	clast: number;
}

export interface RankedPlayerExportProperties {
	licence: string;
	lastname: string;
	firstname: string;
	clubName: string;
	clubCode: string;
	pointsRank: number;
}

export default class RankedPlayer extends SmartpingObject {
	readonly #licence: string;
	readonly #lastname: string;
	readonly #firstname: string;
	readonly #clubName: string;
	readonly #clubCode: string;
	readonly #pointsRank: number;

	constructor (properties: RankedPlayerConstructorProperties) {
		super();

		this.#licence = isEmpty(properties.licence) ? '' : properties.licence;
		this.#lastname = isEmpty(properties.nom) ? '' : properties.nom;
		this.#firstname = isEmpty(properties.prenom) ? '' : properties.prenom;
		this.#clubName = isEmpty(properties.club) ? '' : properties.club;
		this.#clubCode = isEmpty(properties.nclub) ? '' : properties.nclub;
		this.#pointsRank = isEmpty(properties.clast) ? 0 : properties.clast;
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

	public async details(): Promise<PlayerDetails|undefined> {
		return PlayerApi.getPlayer(this.#licence);
	}

	public normalize(): RankedPlayerExportProperties {
		return {
			licence: this.#licence,
			lastname: this.#lastname,
			firstname: this.#firstname,
			clubName: this.#clubName,
			clubCode: this.#clubCode,
			pointsRank: this.#pointsRank,
		};
	}
}
