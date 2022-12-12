import { SmartpingObject } from '../../smartping-object'
import { isEmpty } from '../../../helpers/validation'
import TeamMatchDetails from './team-match-details'
import TeamContestApi from '../../../services/team-contest-api'

export interface TeamMatchConstructorProperties {
	libelle: string;
	equa: string;
	equb: string;
	scorea: number;
	scoreb: number;
	lien: string;
}

export interface LinkParameters {
	is_retour: boolean
	phase: number
	res_1: number
	res_2: number
	equip_1: string
	equip_2: string
	equip_id1: number
	equip_id2: number
}

export default class TeamMatch extends SmartpingObject {
	readonly #name: string
	readonly #teamNameA: string
	readonly #teamNameB: string
	readonly #teamScoreA: number
	readonly #teamScoreB: number
	readonly #link: string
	readonly #id: number
	readonly #paramsToAccessDetails: LinkParameters

	constructor (properties: TeamMatchConstructorProperties) {
		super();

		this.#name = isEmpty(properties.libelle) ? '' : properties.libelle;
		this.#teamNameA = isEmpty(properties.equa) ? '' : properties.equa;
		this.#teamNameB = isEmpty(properties.equb) ? '' : properties.equb;
		this.#teamScoreA = isEmpty(properties.scorea) ? 0 : properties.scorea;
		this.#teamScoreB = isEmpty(properties.scoreb) ? 0 : properties.scoreb;

		if (isEmpty(properties.lien)) {
			this.#link = '';
			this.#id = 0;
			this.#paramsToAccessDetails = {
				is_retour: false,
				phase: 0,
				res_1: 0,
				res_2: 0,
				equip_1: '',
				equip_2: '',
				equip_id1: 0,
				equip_id2: 0,
			}
		} else {
			this.#link = properties.lien;

			const linkParameters = new URLSearchParams(this.#link);

			this.#id = Number(linkParameters.get('renc_id'));
			this.#paramsToAccessDetails = {
				is_retour: Boolean(linkParameters.get('is_retour')),
				phase: Number(linkParameters.get('phase')),
				res_1: Number(linkParameters.get('res_1')),
				res_2: Number(linkParameters.get('res_2')),
				equip_1: linkParameters.get('equip_1') || '',
				equip_2: linkParameters.get('equip_2') || '',
				equip_id1: Number(linkParameters.get('equip_id1')),
				equip_id2: Number(linkParameters.get('equip_id2')),
			}
		}
	}

	public name(): string {
		return this.#name;
	}

	public teamNameA(): string {
		return this.#teamNameA;
	}

	public teamNameB(): string {
		return this.#teamNameB;
	}

	public teamScoreA(): number {
		return this.#teamScoreA;
	}

	public teamScoreB(): number {
		return this.#teamScoreB;
	}

	public link(): string {
		return this.#link;
	}

	public id(): number {
		return this.#id;
	}

	public detailsParameters(): LinkParameters {
		return this.#paramsToAccessDetails;
	}

	public async details(): Promise<TeamMatchDetails|undefined> {
		return TeamContestApi.getTeamChampionshipMatch(this.#id, this.#paramsToAccessDetails);
	}
}
