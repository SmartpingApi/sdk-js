import type { DateTime } from 'luxon';

import {
	createDate,
	nonNullableDateFactory,
	stringifyDate,
} from '#src/helpers/datetime_helpers.js';
import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingIndividualContestGame } from '#src/models/contest/individual/individual_contest_game.js';
import type { SmartpingIndividualContestRank } from '#src/models/contest/individual/individual_contest_rank.js';
import { GetIndividualContestGames } from '#src/queries/contests/individual/get_games.js';
import { GetIndividualContestRank } from '#src/queries/contests/individual/get_rank.js';
import type { SmartpingContext } from '#src/smartping.js';

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
	#rankings: Array<SmartpingIndividualContestRank> = [];

	/** Parties du groupe */
	#games: Array<SmartpingIndividualContestGame> = [];

	constructor(properties: NewProperties, private readonly context: SmartpingContext) {
		super();
		this.#name = this.setOrFallback(properties.tour, '');
		this.#date = this.setOrFallback(properties.date, createDate(), nonNullableDateFactory());
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
			date: stringifyDate(this.#date),
			contestId: this.#contestId,
			divisionId: this.#divisionId,
			groupId: this.#groupId,
		};
	}

	public async preload(relations: Array<RelationName> | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			rank: async () => {
				if (
					this.#contestId === undefined ||
					this.#divisionId === undefined ||
					this.#groupId === undefined
				) {
					return;
				}

				this.#rankings = await GetIndividualContestRank.create(this.context).run(
					this.#contestId,
					this.#divisionId,
					this.#groupId,
				);
			},
			games: async () => {
				if (
					this.#contestId === undefined ||
					this.#divisionId === undefined ||
					this.#groupId === undefined
				) {
					return;
				}

				this.#games = await GetIndividualContestGames.create(this.context).run(
					this.#contestId,
					this.#divisionId,
					this.#groupId,
				);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
