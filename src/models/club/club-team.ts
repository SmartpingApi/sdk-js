import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'
import ContestApi from '../../services/contest-api'
import Contest from '../contest/contest'
import Division from '../contest/division'
import TeamPool from '../contest/team/team-pool'
import TeamContestApi from '../../services/team-contest-api'
import OrganizationApi from '../../services/organization-api'
import Organization from '../organization/organization'

export interface ClubTeamConstructorProperties {
	idequipe: number;
	libequipe: string;
	idepr: number;
	libepr: string;
	libdivision: string;
	liendivision: string;
}

export interface ExportClubTeamProperties {
	id: number;
	name: string;
	contestId: number;
	contestName: string;
	divisionName: string;
	divisionLink: string;
}

export default class ClubTeam extends SmartpingObject {
	readonly #id: number;
	readonly #name: string;
	readonly #contestId: number;
	readonly #contestName: string;
	readonly #divisionName: string;
	readonly #divisionLink: string;
	readonly #poolId: number;
	readonly #divisionId: number;
	readonly #organizerId: number;

	constructor (properties: ClubTeamConstructorProperties) {
		super();

		this.#id = isEmpty(properties.idequipe) ? 0 : properties.idequipe;
		this.#name = isEmpty(properties.libequipe) ? '' : properties.libequipe;
		this.#contestId = isEmpty(properties.idepr) ? 0 : properties.idepr;
		this.#contestName = isEmpty(properties.libepr) ? '' : properties.libepr;
		this.#divisionName = isEmpty(properties.libdivision) ? '' : properties.libdivision;
		this.#divisionLink = isEmpty(properties.liendivision) ? '' : properties.liendivision;

		const parameters = new URLSearchParams(this.#divisionLink);

		this.#poolId = Number(parameters.get('cx_poule')) || 0;
		this.#divisionId = Number(parameters.get('D1')) || 0;
		this.#organizerId = Number(parameters.get('organisme_pere')) || 0;
	}

	public id(): number {
		return this.#id;
	}

	public name(): string {
		return this.#name;
	}

	public contestId(): number {
		return this.#contestId;
	}

	public contestName(): string {
		return this.#contestName;
	}

	public divisionName(): string {
		return this.#divisionName;
	}

	public divisionLink(): string {
		return this.#divisionLink;
	}

	public async contest(): Promise<Contest|undefined> {
		const result = await ContestApi.findContests(this.#organizerId, 'E');

		if (result.length <= 0) {
			return undefined;
		}

		const filtered = result.filter((r) => r.id() === this.#contestId);
		if (filtered.length <= 0) {
			return undefined;
		}

		return filtered[0];
	}

	public async division(): Promise<Division|undefined> {
		const result = await ContestApi.findDivisionsForContest(this.#organizerId, this.#contestId, 'E');

		if (result.length <= 0) {
			return undefined;
		}

		const filtered = result.filter((r) => r.id() === this.#divisionId);
		if (filtered.length <= 0) {
			return undefined;
		}

		return filtered[0];
	}

	public async pool(): Promise<TeamPool|undefined> {
		const result = await TeamContestApi.getTeamChampionshipPoolsForDivision(this.#divisionId);

		if (result.length <= 0) {
			return undefined;
		}

		const filtered = result.filter((r) => r.id() === this.#poolId);
		if (filtered.length <= 0) {
			return undefined;
		}

		return filtered[0];
	}

	public async organizer(): Promise<Organization|undefined> {
		return OrganizationApi.getOrganization(this.#organizerId);
	}
}
