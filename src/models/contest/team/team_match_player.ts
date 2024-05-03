import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingClubDetail } from '#src/models/club/club_detail.js';
import type { SmartpingPlayer } from '#src/models/player/player.js';
import { GetClub } from '#src/queries/clubs/get_club.js';
import { FindPlayersByClub } from '#src/queries/players/find_by_club.js';
import type { SmartpingContext } from '#src/smartping.js';

type NewProperties = {
	name: string;
	details: string;
	clubCode: string;
};

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

	constructor(properties: NewProperties, private readonly context: SmartpingContext) {
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

	public serialize() {
		return {
			name: this.#name,
			gender: this.#gender,
			points: this.#points,
			clubCode: this.#clubCode,
		};
	}

	public async preload(relations: Array<RelationName> | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			club: async () => {
				this.#club = await GetClub.create(this.context).run(this.#clubCode);
			},
			licence: async () => {
				const players = await FindPlayersByClub.create(this.context).run(this.#clubCode);
				this.#licence = players.find(
					(player) => `${player.lastname} ${player.firstname}` === this.#name,
				);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
