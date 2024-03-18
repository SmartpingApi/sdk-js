import type { Preloads } from '@/models/base_model.js';
import { BaseModel } from '@/models/base_model.js';
import { SmartpingTeamMatch, SmartpingTeamPoolTeam } from '@/models/index.js';
import { getPoolRanking } from '@/queries/contests/team/get_pool_ranking.js';
import { getMatchesForPool } from '@/queries/contests/team/get_pool_matches.js';

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
	#matches: SmartpingTeamMatch[] = [];

	/** Classement */
	#rankings: SmartpingTeamPoolTeam[] = [];

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

	public async preload(relations: RelationName[]|'*') {
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
