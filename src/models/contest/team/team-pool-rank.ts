import { SmartpingObject } from '../../smartping-object'
import { isEmpty } from '../../../helpers/validation'
import ClubApi from '../../../services/club-api'
import ClubDetail from '../../club/club-detail'

export interface TeamPoolRankConstructorProperties {
	poule: string;
	clt: number;
	equipe: string;
	joue: number;
	pts: number;
	numero: string;
}

export default class TeamPoolRank extends SmartpingObject {
	readonly #poolName: string;
	readonly #rank: number;
	readonly #teamName: string;
	readonly #totalPlayed: number;
	readonly #score: number;
	readonly #clubCode: string;

	constructor (properties: TeamPoolRankConstructorProperties) {
		super();

		this.#poolName = isEmpty(properties.poule) ? '' : properties.poule;
		this.#rank = isEmpty(properties.clt) ? 0 : Number(properties.clt);
		this.#teamName = isEmpty(properties.equipe) ? '' : properties.equipe;
		this.#totalPlayed = isEmpty(properties.joue) ? 0 : Number(properties.joue);
		this.#score = isEmpty(properties.pts) ? 0 : Number(properties.pts);
		this.#clubCode = isEmpty(properties.numero) ? '' : properties.numero;
	}

	public poolName(): string {
		return this.#poolName;
	}

	public rank(): number {
		return this.#rank;
	}

	public teamName(): string {
		return this.#teamName;
	}

	public totalPlayed(): number {
		return this.#totalPlayed;
	}

	public score(): number {
		return this.#score;
	}

	public clubCode(): string {
		return this.#clubCode;
	}

	public async club(): Promise<ClubDetail|undefined> {
		return ClubApi.getClub(this.#clubCode);
	}
}
