import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingTeamPool } from '#src/models/contest/team/team_pool.js';
import { getPoolsForDivision } from '#src/queries/contests/team/get_pools.js';

type NewProperties = {
	iddivision: number;
	libelle: string;
}

type RelationName = 'pools';

export class SmartpingTeamDivision extends BaseModel {
	/** ID interne pour la Fédération */
	readonly #id: number;

	/** Nom */
	readonly #name: string;

	/** Poules associées */
	#pools: SmartpingTeamPool[] = [];

	constructor (properties: NewProperties) {
		super();
		this.#id = this.setOrFallback(properties.iddivision, 0);
		this.#name = this.setOrFallback(properties.libelle, '');
	}

	public get id() {
		return this.#id;
	}

	public get name() {
		return this.#name;
	}

	public get pools() {
		return this.#pools;
	}

	public serialize() {
		return {
			id: this.#id,
			name: this.#name,
		};
	}

	public async preload(relations: RelationName[]|'*') {
		const preloadFunctions: Preloads<RelationName> = {
			pools: async () => {
				this.#pools = await getPoolsForDivision(this.#id);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
