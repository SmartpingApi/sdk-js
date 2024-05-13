import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingTeamPool } from '#src/models/contest/team/team_pool.js';
import { GetPoolsForDivision } from '#src/queries/contests/team/get_pools.js';
import type { SmartpingContext } from '#src/smartping.js';

type NewProperties = {
	iddivision: string;
	libelle: string;
};

type RelationName = 'pools';

export class SmartpingTeamDivision extends BaseModel {
	/** ID interne pour la Fédération */
	readonly #id: number;

	/** Nom */
	readonly #name: string;

	/** Poules associées */
	#pools: Array<SmartpingTeamPool> = [];

	constructor(properties: NewProperties, private readonly context: SmartpingContext) {
		super();
		this.#id = this.setOrFallback(properties.iddivision, 0, Number);
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

	public async preload(relations: Array<RelationName> | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			pools: async () => {
				this.#pools = await GetPoolsForDivision.create(this.context).run(this.#id);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
