import type { DateTime } from 'luxon';

import { dateFactory, stringifyDate } from '#src/helpers/datetime_helpers.js';
import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingClubDetail } from '#src/models/club/club_detail.js';
import type { SmartpingClubTeam } from '#src/models/club/club_team.js';
import { GetClub } from '#src/queries/clubs/get_club.js';
import { GetTeamsForClub } from '#src/queries/clubs/get_teams.js';
import type { SmartpingContext } from '#src/smartping.js';

type NewProperties = {
	idclub: string;
	numero: string;
	nom: string;
	validation: string | undefined;
	typeclub: string;
};

type RelationName = 'details' | 'teams';

export class SmartpingClub extends BaseModel {
	/** ID interne pour la Fédération */
	readonly #id: number;

	/** ID publique (numéro de club) */
	readonly #code: string;

	/** Nom */
	readonly #name: string;

	/** Date de validation (pour la saison en cours) */
	readonly #validatedAt: DateTime | undefined;

	/**
	 * Type de club :
	 * - L = affilié
	 * - C = corporatif
	 */
	readonly #type: string;

	/** Informations détaillées du club */
	#details: SmartpingClubDetail | undefined;

	/** Ensemble des équipes associées */
	#teams: Array<SmartpingClubTeam>;

	constructor(properties: NewProperties, private readonly context: SmartpingContext) {
		super();
		this.#id = this.setOrFallback(properties.idclub, 0, Number);
		this.#code = this.setOrFallback(properties.numero, '');
		this.#name = this.setOrFallback(properties.nom, '');
		this.#validatedAt = this.setOrFallback(properties.validation, undefined, dateFactory());
		this.#type = this.setOrFallback(properties.typeclub, '');
		this.#details = undefined;
		this.#teams = [];
	}

	public get id() {
		return this.#id;
	}

	public get code() {
		return this.#code;
	}

	public get name() {
		return this.#name;
	}

	public get validatedAt() {
		return this.#validatedAt;
	}

	public get type() {
		return this.#type;
	}

	public get details() {
		return this.#details;
	}

	public get teams() {
		return this.#teams;
	}

	public serialize() {
		return {
			id: this.#id,
			code: this.#code,
			name: this.#name,
			type: this.#type,
			validatedAt: stringifyDate(this.#validatedAt),
		};
	}

	public async preload(relations: Array<RelationName> | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			details: async () => {
				this.#details = await GetClub.create(this.context).run(this.#code);
			},
			teams: async () => {
				this.#teams = await GetTeamsForClub.create(this.context).run(this.#code, 'none');
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
