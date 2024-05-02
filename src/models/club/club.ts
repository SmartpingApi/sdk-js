import type { DateTime } from 'luxon';

import { createDate, stringifyDate } from '#src/helpers/datetime_helpers.js';
import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingClubDetail } from '#src/models/club/club_detail.js';
import type { SmartpingClubTeam } from '#src/models/club/club_team.js';
import { getClub } from '#src/queries/clubs/find_by_code.js';
import { getTeamsForClub, TeamTypes } from '#src/queries/clubs/get_teams.js';

type NewProperties = {
	idclub: number;
	numero: string;
	nom: string;
	validation: string | undefined;
	typeclub: string;
}

type RelationName = 'details'|'teams';

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
	#teams: SmartpingClubTeam[];

	constructor(properties: NewProperties) {
		super();
		this.#id = this.setOrFallback(properties.idclub, 0);
		this.#code = this.setOrFallback(properties.numero, '');
		this.#name = this.setOrFallback(properties.nom, '');
		this.#validatedAt = this.setOrFallback(properties.validation, undefined, (value) => createDate(value, 'DD/MM/YYYY'));
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

	public async preload(relations: RelationName[]|'*') {
		const preloadFunctions: Preloads<RelationName> = {
			details: async () => {
				this.#details = await getClub(this.#code);
			},
			teams: async () => {
				this.#teams = await getTeamsForClub(this.#code, TeamTypes.None);
			}
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
