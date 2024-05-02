import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingClubDetail } from '#src/models/club/club_detail.js';
import { getClub } from '#src/queries/clubs/find_by_code.js';

type NewProperties = {
	rang: string;
	nom: string;
	clt: string;
	club: string;
	points: string;
};

type RelationName = 'club';

const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

export class SmartpingFederalCriteriumRank extends BaseModel {
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

	constructor (properties: NewProperties) {
		super();
		this.#rank = this.setOrFallback(properties.rang, 0, Number);
		this.#name = this.setOrFallback(properties.nom, '');
		this.#points = this.#computePoints(properties.points);
		this.#clubCode = this.setOrFallback(properties.club, '');
		this.#rankScore = this.#computeScore(properties.clt);
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

	#computePoints(points: string | undefined) {
		if (points === undefined) {
			return 0;
		}

		if (points.startsWith('N')) {
			const [nationalRank, officialPoints] = points.split(' - ');
			this.#nationalRank = nationalRank ? Number(nationalRank.slice(2)) : undefined;
			this.#points = officialPoints ? Number(officialPoints) : 0;
		}

		return Number(points);
	}

	#computeScore(score: string | undefined) {
		const detail: Record<string, number> = {};

		if (score === undefined) {
			return detail;
		}

		let originalScore = score;

		for (const letter of alphabet) {
			const charIndex = originalScore.indexOf(letter);
			// eslint-disable-next-line unicorn/prefer-string-slice
			const letterScore = originalScore.substring(0, charIndex);

			if (letterScore === '') {
				continue;
			}

			detail[letter] = Number(letterScore);
			originalScore = originalScore.slice(charIndex + 1);
		}

		return detail;
	}

	public async preload(relations: RelationName[]|'*') {
		const preloadFunctions: Preloads<RelationName> = {
			club: async () => {
				this.#club = await getClub(this.#clubCode);
			}
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
