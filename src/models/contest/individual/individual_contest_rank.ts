import { computePoints, computeScore } from '#src/helpers/utils.js';
import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingClubDetail } from '#src/models/club/club_detail.js';
import { GetClub } from '#src/queries/clubs/get_club.js';
import type { SmartpingContext } from '#src/smartping.js';

type NewProperties = {
	rang: string;
	nom: string;
	clt: string;
	club: string;
	points: string;
};

type RelationName = 'club';

export class SmartpingIndividualContestRank extends BaseModel {
	/** Rang */
	readonly #rank: number;

	/** Nom de la personne */
	readonly #name: string;

	/** Code du club */
	readonly #clubCode: string;

	/**
	 * Points gagnés pour l'ensemble des tours.
	 * Exemple : `{A : 10, B : 0, C : 3}`
	 */
	readonly #rankScore: Record<string, number>;

	/** Points officiels */
	#points: number;

	/** Rang national */
	#nationalRank: number | undefined;

	/** Détails du club */
	#club: SmartpingClubDetail | undefined;

	constructor(properties: NewProperties, private readonly context: SmartpingContext) {
		super();
		this.#rank = this.setOrFallback(properties.rang, 0, Number);
		this.#name = this.setOrFallback(properties.nom, '');
		[this.#points, this.#nationalRank] = computePoints(properties.points);
		this.#clubCode = this.setOrFallback(properties.club, '');
		this.#rankScore = computeScore(properties.clt);
	}

	public get rank() {
		return this.#rank;
	}

	public get name() {
		return this.#name;
	}

	public get points() {
		return this.#points;
	}

	public get clubCode() {
		return this.#clubCode;
	}

	public get rankScore() {
		return this.#rankScore;
	}

	public get club() {
		return this.#club;
	}

	public get nationalRank() {
		return this.#nationalRank;
	}

	public serialize() {
		return {
			rank: this.rank,
			name: this.name,
			points: this.points,
			club: this.clubCode,
			rankScore: this.rankScore,
			nationalRank: this.nationalRank,
		};
	}

	public async preload(relations: Array<RelationName> | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			club: async () => {
				this.#club = await GetClub.create(this.context).run(this.#clubCode);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
