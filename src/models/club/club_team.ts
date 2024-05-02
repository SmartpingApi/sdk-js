import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingContest } from '#src/models/contest/contest.js';
import { CONTEST_TYPES } from '#src/models/contest/contest.js';
import type { SmartpingTeamDivision } from '#src/models/contest/team/team_division.js';
import type { SmartpingTeamPool } from '#src/models/contest/team/team_pool.js';
import type { SmartpingTeamPoolTeam } from '#src/models/contest/team/team_pool_team.js';
import { findContests } from '#src/queries/contests/find_contests.js';
import { findDivisionsForTeamContest } from '#src/queries/contests/team/get_divisions.js';
import { getPoolRanking } from '#src/queries/contests/team/get_pool_ranking.js';
import { getPoolsForDivision } from '#src/queries/contests/team/get_pools.js';

type NewProperties = {
	idequipe: number;
	libequipe: string;
	idepr: number;
	libepr: string;
	libdivision: string;
	liendivision: string;
}

type RelationName = 'contest' | 'division' | 'pool' | 'ranking';

export class SmartpingClubTeam extends BaseModel {
	/** ID interne pour la Fédération */
	readonly #id: number;

	/** Nom */
	readonly #name: string;

	/** ID de l'épreuve */
	readonly #contestId: number;

	/** Nom de l'épreuve */
	readonly #contestName: string;

	/** Nom de la division */
	readonly #divisionName: string;

	/** Lien vers la division */
	readonly #divisionLink: string | undefined;

	/** ID de la poule */
	readonly #poolId: number | undefined;

	/** ID de la division */
	readonly #divisionId: number | undefined;

	/** ID de l'organisme */
	readonly #organizerId: number | undefined;

	/** Informations détaillées de l'épreuve */
	#contest: SmartpingContest | undefined;

	/** Informations détaillées de la division */
	#division: SmartpingTeamDivision | undefined;

	/** Informations détaillées de la poule */
	#pool: SmartpingTeamPool | undefined;

	/** Classement de l'équipe dans la poule */
	#poolRank: SmartpingTeamPoolTeam | undefined;

	constructor (properties: NewProperties) {
		super();

		this.#id = this.setOrFallback(properties.idequipe, 0);
		this.#name = this.setOrFallback(properties.libequipe, '');
		this.#contestId = this.setOrFallback(properties.idepr, 0);
		this.#contestName = this.setOrFallback(properties.libepr, '');
		this.#divisionName = this.setOrFallback(properties.libdivision, '');

		if (this.isEmpty(properties.liendivision)) {
			this.#divisionLink = undefined;
			this.#poolId = undefined;
			this.#divisionId = undefined;
			this.#organizerId = undefined;
		} else {
			this.#divisionLink = properties.liendivision;
			const parameters = new URLSearchParams(this.#divisionLink);
			this.#poolId = this.setOrFallback(parameters.get('cx_poule'), undefined, Number);
			this.#divisionId = this.setOrFallback(parameters.get('D1'), undefined, Number);
			this.#organizerId = this.setOrFallback(parameters.get('organisme_pere'), undefined, Number);
		}
	}

	public get id() {
		return this.#id;
	}

	public get name() {
		return this.#name;
	}

	public get contestId() {
		return this.#contestId;
	}

	public get contestName() {
		return this.#contestName;
	}

	public get divisionName() {
		return this.#divisionName;
	}

	public get divisionLink() {
		return this.#divisionLink;
	}

	public get poolId() {
		return this.#poolId;
	}

	public get divisionId() {
		return this.#divisionId;
	}

	public get organizerId() {
		return this.#organizerId;
	}

	public get contest() {
		return this.#contest;
	}

	public get division() {
		return this.#division;
	}

	public get pool() {
		return this.#pool;
	}

	public get poolRank() {
		return this.#poolRank;
	}

	public serialize() {
		return {
			id: this.#id,
			name: this.#name,
			contest: {
				id: this.#contestId,
				name: this.#contestName,
			},
			division: {
				id: this.#divisionId,
				name: this.#divisionName,
				link: this.#divisionLink,
				poolId: this.#poolId,
				organizerId: this.#organizerId,
			},
		};
	}

	async preload(relations: RelationName[]|'*') {
		const preloadFunctions: Preloads<RelationName> = {
			contest: async () => {
				if (this.#organizerId === undefined) return;
				const contests = await findContests(this.#organizerId, CONTEST_TYPES.TEAM);
				this.#contest = contests.find((contest) => contest.id === this.#contestId);
			},
			division: async () => {
				if (this.#organizerId === undefined) return;
				const divisions = await findDivisionsForTeamContest(this.#organizerId, this.#contestId);
				this.#division = divisions.find((division) => division.id === this.#divisionId);
			},
			pool: async () => {
				if (this.#organizerId === undefined || this.#divisionId === undefined || this.#poolId === undefined) return;
				const pools = await getPoolsForDivision(this.#divisionId);
				this.#pool = pools.find((pool) => pool.id === this.#poolId);
			},
			ranking: async () => {
				if (this.#divisionId === undefined || this.#poolId === undefined) return;
				const rankings = await getPoolRanking(this.#divisionId, this.#poolId);
				this.#poolRank = rankings.find((ranking) => ranking.teamName === this.#name);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
