import type { DateTime } from 'luxon';
import type { Preloads } from '@/models/base_model.js';
import { BaseModel } from '@/models/base_model.js';
import { createDate } from '@/helpers/datetime_helpers.js';
import { SmartpingIndividualContestGame, SmartpingIndividualContestRank } from '@/models/index.js';
import { getIndividualContestRank } from '@/queries/contests/individual/get_rank.js';
import { getIndividualContestGames } from '@/queries/contests/individual/get_games.ts';

type NewProperties = {
	tour: string;
	lien: string;
	date: string;
};

type RelationName = 'rank' | 'games';

export class SmartpingIndividualContestGroup extends BaseModel {
	/** Nom du tour */
	readonly #name: string;

	/** Date du tour */
	readonly #date: DateTime;

	/** ID de l'épreuve */
	readonly #contestId: number | undefined;

	/** ID de la division */
	readonly #divisionId: number | undefined;

	/** ID du groupe */
	readonly #groupId: number | undefined;

	/** Classement du groupe */
	#rankings: SmartpingIndividualContestRank[] = [];

	/** Parties du groupe */
	#games: SmartpingIndividualContestGame[] = [];

	constructor(properties: NewProperties) {
		super();
		this.#name = this.setOrFallback(properties.tour, '');
		this.#date = this.setOrFallback(properties.date, createDate(), createDate(properties.date, 'DD/MM/YYYY'));
		this.#contestId = undefined;
		this.#divisionId = undefined;
		this.#groupId = undefined;

		if (properties.lien) {
			const parameters = new URLSearchParams(properties.lien);

			this.#contestId = this.setOrFallback(parameters.get('epr'), undefined, Number);
			this.#divisionId = this.setOrFallback(parameters.get('res_division'), undefined, Number);
			this.#groupId = this.setOrFallback(parameters.get('cx_tableau'), undefined, Number);
		}
	}

	public get name() {
		return this.#name;
	}

	public get date() {
		return this.#date;
	}

	public get contestId() {
		return this.#contestId;
	}

	public get divisionId() {
		return this.#divisionId;
	}

	public get groupId() {
		return this.#groupId;
	}

	public get rankings() {
		return this.#rankings;
	}

	public get games() {
		return this.#games;
	}

	public serialize() {
		return {
			tour: this.#name,
			date: this.#date.toFormat('DD/MM/YYYY'),
		};
	}

	public async preload(relations: RelationName[] | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			rank: async () => {
				if (this.#contestId === undefined || this.#divisionId === undefined || this.#groupId === undefined) {
					return;
				}

				this.#rankings = await getIndividualContestRank(this.#contestId, this.#divisionId, this.#groupId);
			},
			games: async () => {
				if (this.#contestId === undefined || this.#divisionId === undefined || this.#groupId === undefined) {
					return;
				}

				this.#games = await getIndividualContestGames(this.#contestId, this.#divisionId, this.#groupId);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
