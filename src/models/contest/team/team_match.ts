import { DateTime } from 'luxon';

import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingTeamMatchDetails } from '#src/models/contest/team/team_match_details.js';
import { getMatch } from '#src/queries/contests/team/get_match.js';

type NewProperties = {
	libelle: string;
	equa: string;
	equb: string;
	scorea: number;
	scoreb: number;
	lien: string;
	dateprevue: string;
	datereelle: string;
}

export type TeamMatchLinkParameters = {
	is_retour: boolean;
	phase: number;
	res_1: number;
	res_2: number;
	equip_1: string;
	equip_2: string;
	equip_id1: number;
	equip_id2: number;
	clubnum_1: string;
	clubnum_2: string;
}

type RelationName = 'details';

export class SmartpingTeamMatch extends BaseModel {
	/**
	 * Nom.
	 * Exemple : "Poule 1 - tour n°1 du 19/01/2024"
	 */
	readonly #name: string;

	/** Nom de l'équipe du côté A */
	readonly #teamNameA: string;

	/** Nom de l'équipe du côté W */
	readonly #teamNameB: string;

	/** Score de l'équipe du côté A */
	readonly #teamScoreA: number | undefined;

	/** Score de l'équipe du côté W */
	readonly #teamScoreB: number | undefined;

	/** Lien vers le détail de la rencontre */
	readonly #link: string | undefined;

	/** ID de la rencontre */
	readonly #id: number | undefined;

	/** Paramètres pour accéder aux détails de la rencontre */
	readonly #paramsToAccessDetails: TeamMatchLinkParameters | undefined;

	/** Date prévue */
	readonly #plannedDate: DateTime;

	/** Date réelle */
	readonly #realDate: DateTime;

	/** Détails de la rencontre */
	#details: SmartpingTeamMatchDetails | undefined;

	constructor(properties: NewProperties) {
		super();
		this.#name = this.setOrFallback(properties.libelle, '');
		this.#teamNameA = this.setOrFallback(properties.equa, '');
		this.#teamNameB = this.setOrFallback(properties.equb, '');
		this.#teamScoreA = this.setOrFallback(properties.scorea, 0);
		this.#teamScoreB = this.setOrFallback(properties.scoreb, 0);
		this.#plannedDate = this.setOrFallback(properties.dateprevue, DateTime.now());
		this.#realDate = this.setOrFallback(properties.datereelle, DateTime.now());
		this.#details = undefined;

		if (this.isEmpty(properties.lien)) {
			this.#link = undefined;
			this.#id = undefined;
			this.#paramsToAccessDetails = undefined;
		} else {
			this.#link = properties.lien;

			const linkParameters = new URLSearchParams(this.#link);
			console.log({ linkParameters });

			this.#id = this.setOrFallback(linkParameters.get('renc_id'), undefined, Number);
			this.#paramsToAccessDetails = {
				is_retour: this.setOrFallback(linkParameters.get('is_retour'), false, Boolean),
				phase: this.setOrFallback(linkParameters.get('phase'), 0, Number),
				res_1: this.setOrFallback(linkParameters.get('res_1'), 0, Number),
				res_2: this.setOrFallback(linkParameters.get('res_2'), 0, Number),
				equip_1: this.setOrFallback(linkParameters.get('equip_1'), ''),
				equip_2: this.setOrFallback(linkParameters.get('equip_2'), ''),
				equip_id1: this.setOrFallback(linkParameters.get('equip_id1'), 0, Number),
				equip_id2: this.setOrFallback(linkParameters.get('equip_id2'), 0, Number),
				clubnum_1: this.setOrFallback(linkParameters.get('clubnum_1'), ''),
				clubnum_2: this.setOrFallback(linkParameters.get('clubnum_2'), ''),
			};
		}
	}

	public get name() {
		return this.#name;
	}

	public get teamNameA() {
		return this.#teamNameA;
	}

	public get teamNameB() {
		return this.#teamNameB;
	}

	public get teamScoreA() {
		return this.#teamScoreA;
	}

	public get teamScoreB() {
		return this.#teamScoreB;
	}

	public get link() {
		return this.#link;
	}

	public get id() {
		return this.#id;
	}

	public get detailsParameters() {
		return this.#paramsToAccessDetails;
	}

	public get plannedDate() {
		return this.#plannedDate;
	}

	public get realDate() {
		return this.#realDate;
	}

	public get winner() {
		if (this.#teamScoreA === undefined || this.#teamScoreB === undefined) {
			return;
		}

		if (this.#teamScoreA === this.#teamScoreB) {
			// eslint-disable-next-line unicorn/no-null
			return null;
		}

		return this.#teamScoreA > this.#teamScoreB ? this.#teamNameA : this.#teamNameB;
	}

	public get details() {
		return this.#details;
	}

	public serialize() {
		return {
			name: this.#name,
			teamA: {
				name: this.#teamNameA,
				score: this.#teamScoreA,
			},
			teamB: {
				name: this.#teamNameB,
				score: this.#teamScoreB,
			},
			winner: this.winner,
			link: this.#link,
		};
	}

	public async preload(relations: RelationName[]|'*') {
		const preloadFunctions: Preloads<RelationName> = {
			details: async () => {
				if (this.#id && this.#paramsToAccessDetails) {
					this.#details = await getMatch(this.#id, this.#paramsToAccessDetails);
				}
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
