import { SmartpingObject } from '../../smartping-object'
import { isEmpty } from '../../../helpers/validation'
import TeamMatch from './team-match'
import TeamContestApi from '../../../services/team-contest-api'
import TeamPoolRank from './team-pool-rank'

export interface TeamPoolConstructorProperties {
	lien: string;
	libelle: string;
}

export default class TeamPool extends SmartpingObject {
	readonly #link: string;
	readonly #name: string;
	readonly #id: number;
	readonly #divisionId: number;

	constructor (properties: TeamPoolConstructorProperties) {
		super();

		this.#name = isEmpty(properties.libelle) ? '' : properties.libelle;

		if (isEmpty(properties.lien)) {
			this.#link = '';
			this.#id = 0;
			this.#divisionId = 0;
		} else{
			this.#link = properties.lien;

			const linkParemeters = new URLSearchParams(this.#link);

			this.#id = Number(linkParemeters.get('cx_poule'));
			this.#divisionId = Number(linkParemeters.get('D1'));
		}

	}

	public link(): string {
		return this.#link;
	}

	public name(): string {
		return this.#name;
	}

	public id(): number {
		return this.#id;
	}

	public divisionId(): number {
		return this.#divisionId;
	}

	public async matches(): Promise<TeamMatch[]> {
		return TeamContestApi.getTeamChampionshipMatchesForPool(this.#divisionId, this.#id);
	}

	public async ranking(): Promise<TeamPoolRank[]> {
		return TeamContestApi.getTeamChampionshipPoolRanking(this.#divisionId, this.#id);
	}
}
