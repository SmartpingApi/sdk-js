import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingIndividualDivision } from '#src/models/contest/individual/individual_division.js';
import type { SmartpingTeamDivision } from '#src/models/contest/team/team_division.js';
import { FindDivisionsForIndividualContest } from '#src/queries/contests/individual/get_divisions.js';
import { FindDivisionsForTeamContest } from '#src/queries/contests/team/get_divisions.js';
import type { SmartpingContext } from '#src/smartping.js';
import type { ValueOf } from '#src/types/index.js';

type NewProperties = {
	idepreuve: string;
	idorga: string;
	libelle: string;
	typepreuve: string;
};

export const CONTEST_TYPES = {
	team: 'E',
	individual: 'I',
} as const;

export type ContestType = keyof typeof CONTEST_TYPES;

type RelationName = 'divisions';

export class SmartpingContest extends BaseModel {
	/** ID interne pour la Fédération */
	readonly #id: number;

	/** ID de l'organisme */
	readonly #organizerId: number;

	/** Nom */
	readonly #name: string;

	/** Type de compétition */
	readonly #type: ValueOf<typeof CONTEST_TYPES>;

	/** Divisions associées */
	#divisions: Array<SmartpingTeamDivision | SmartpingIndividualDivision> = [];

	constructor(properties: NewProperties, private readonly context: SmartpingContext) {
		super();
		this.#id = this.setOrFallback(properties.idepreuve, 0, Number);
		this.#organizerId = this.setOrFallback(properties.idorga, 0, Number);
		this.#name = this.setOrFallback(properties.libelle, '');
		this.#type = this.setOrFallback(properties.typepreuve, 'E');
	}

	public get id() {
		return this.#id;
	}

	public get organizerId() {
		return this.#organizerId;
	}

	public get name() {
		return this.#name;
	}

	public get type() {
		return this.#type;
	}

	public get divisions() {
		return this.#divisions;
	}

	public serialize() {
		return {
			id: this.#id,
			name: this.#name,
			type: this.#type,
			organizerId: this.#organizerId,
		};
	}

	public async preload(relations: Array<RelationName> | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			divisions: async () => {
				if (this.#type === 'E') {
					this.#divisions = await FindDivisionsForTeamContest.create(this.context).run(
						this.#organizerId,
						this.#id,
					);
				} else if (this.#type === 'I') {
					this.#divisions = await FindDivisionsForIndividualContest.create(this.context).run(
						this.#organizerId,
						this.#id,
					);
				}
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
