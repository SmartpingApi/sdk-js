import type { Preloads } from '@/models/base_model.js';
import { BaseModel } from '@/models/base_model.js';
import { SmartpingClubDetail, SmartpingPlayer } from '@/models/index.js';
import { getClub } from '@/queries/clubs/find_by_code.js';
import { findPlayersByClub } from '@/queries/players/find_by_club.js';

type NewProperties = {
	name: string;
	details: string;
	clubCode: string;
}

type RelationName = 'club' | 'licence';

export class SmartpingTeamMatchPlayer extends BaseModel {
	/** Genre */
	readonly #gender: string;

	/** Points officiels */
	readonly #points: number;

	/** Nom */
	readonly #name: string;

	/** Numéro du club */
	readonly #clubCode: string;

	/** Détails du club */
	#club: SmartpingClubDetail | undefined;

	/** Détails du licencié */
	#licence: SmartpingPlayer | undefined;

	constructor(properties: NewProperties) {
		super();
		this.#name = properties.name;

		const [gender, points] = properties.details.split(' ');
		const formattedPoints = points?.replace('pts', '');

		this.#clubCode = properties.clubCode;
		this.#gender = this.setOrFallback(gender, 'M');
		this.#points = this.setOrFallback(formattedPoints, 0, Number);
	}

	public get name() {
		return this.#name;
	}

	public get gender() {
		return this.#gender;
	}

	public get points() {
		return this.#points;
	}

	public get clubCode() {
		return this.#clubCode;
	}

	public get club() {
		return this.#club;
	}

	public get licence() {
		return this.#licence;
	}

	public async preload(relations: RelationName[]|'*') {
		const preloadFunctions: Preloads<RelationName> = {
			club: async () => {
				this.#club = await getClub(this.#clubCode);
			},
			licence: async () => {
				const players = await findPlayersByClub(this.#clubCode);
				this.#licence = players.find((player) => `${player.lastname} ${player.firstname}` === this.#name);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
