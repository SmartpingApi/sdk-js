import type { ValueOf } from '@/types/index.js';
import type { Preloads } from '@/models/base_model.js';
import { BaseModel } from '@/models/base_model.js';
import { SmartpingIndividualDivision, SmartpingTeamDivision } from '@/models/index.js';
import {
	findDivisionsForIndividualContest,
	findDivisionsForTeamContest,
} from '@/queries/contests/team/get_divisions.js';

type NewProperties = {
	idepreuve: number;
	idorga: number;
	libelle: string;
	typepreuve: string;
}

export const CONTEST_TYPES = {
	TEAM: 'E',
	INDIVIDUAL: 'I',
} as const;

export type ContestType = typeof CONTEST_TYPES;

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
	#divisions: (SmartpingTeamDivision | SmartpingIndividualDivision)[] = [];

	constructor(properties: NewProperties) {
		super();
		this.#id = this.setOrFallback(properties.idepreuve, 0);
		this.#organizerId = this.setOrFallback(properties.idorga, 0);
		this.#name = this.setOrFallback(properties.libelle, '');
		this.#type = this.setOrFallback(properties.typepreuve, CONTEST_TYPES.TEAM);
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

	public async preload(relations: RelationName[] | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			divisions: async () => {
				if (this.#type === CONTEST_TYPES.TEAM) {
					this.#divisions = await findDivisionsForTeamContest(this.#organizerId, this.#id);
				} else if (this.#type === CONTEST_TYPES.INDIVIDUAL) {
					this.#divisions = await findDivisionsForIndividualContest(this.#organizerId, this.#id);
				}
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
