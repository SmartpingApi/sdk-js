import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingTeamMatch } from '#src/models/contest/team/team_match.js';
import type { SmartpingTeamPoolTeam } from '#src/models/contest/team/team_pool_team.js';
import { getMatchesForPool } from '#src/queries/contests/team/get_pool_matches.js';
import { getPoolRanking } from '#src/queries/contests/team/get_pool_ranking.js';

type NewProperties = {
	lien: string;
	libelle: string;
}

type RelationName = 'matches'|'rankings';

export class SmartpingTeamPool extends BaseModel {
	/** Lien pour accéder aux détails de la poule */
	readonly #link: string | undefined;

	/** Nom */
	readonly #name: string;

	/** ID de la poule */
	readonly #id: number | undefined;

	/** ID de la division */
	readonly #divisionId: number | undefined;

	/** Rencontres */
	#matches: Array<SmartpingTeamMatch> = [];

	/** Classement */
	#rankings: Array<SmartpingTeamPoolTeam> = [];

	constructor (properties: NewProperties) {
		super();
		this.#name = this.setOrFallback(properties.libelle, '');

		if (this.isEmpty(properties.lien)) {
			this.#link = undefined;
			this.#id = undefined;
			this.#divisionId = undefined;
		} else{
			this.#link = properties.lien;

			const linkParameters = new URLSearchParams(this.#link);

			this.#id = this.setOrFallback(linkParameters.get('cx_poule'), undefined, Number);
			this.#divisionId = this.setOrFallback(linkParameters.get('D1'), undefined, Number);
		}
	}

	public get link() {
		return this.#link;
	}

	public get name() {
		return this.#name;
	}

	public get id() {
		return this.#id;
	}

	public get divisionId() {
		return this.#divisionId;
	}

	public get matches() {
		return this.#matches;
	}

	public get rankings() {
		return this.#rankings;
	}

	public async preload(relations: Array<RelationName>|'*') {
		const preloadFunctions: Preloads<RelationName> = {
			matches: async () => {
				if (undefined === this.#divisionId) return;
				this.#matches = await getMatchesForPool(this.#divisionId, this.#id);
			},
			rankings: async () => {
				if (undefined === this.#divisionId) return;
				this.#rankings = await getPoolRanking(this.#divisionId, this.#id);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
