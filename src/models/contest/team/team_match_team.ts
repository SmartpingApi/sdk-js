import type { Preloads } from '@/models/base_model.js';
import { BaseModel } from '@/models/base_model.js';
import { SmartpingClubDetail, SmartpingClubTeam, SmartpingTeamMatchPlayer } from '@/models/index.js';
import { getClub } from '@/queries/clubs/find_by_code.js';

type NewProperties = {
	team: SmartpingClubTeam;
	letter: 'A' | 'B';
	clubCode: string;
	players: {
		xja: string;
		xca: string;
		xjb: string;
		xcb: string;
	}[]
};

type RelationName = 'club';

export class SmartpingTeamMatchTeam extends BaseModel {
	/** Détails de l'équipe */
	readonly #team: SmartpingClubTeam;

	/** Numéro du club */
	readonly #clubCode: string;

	/** Détails du club */
	#club: SmartpingClubDetail | undefined;

	/** Liste des joueurs par équipe */
	#players: Record<'teamA' | 'teamB', SmartpingTeamMatchPlayer[]> = {
		teamA: [],
		teamB: [],
	};

	constructor(properties: NewProperties) {
		super();
		this.#team = properties.team;
		this.#clubCode = properties.clubCode;

		for (const player of properties.players) {
			this.#players[`team${properties.letter}`].push(
				new SmartpingTeamMatchPlayer({ name: player.xja, details: player.xca, clubCode: this.#clubCode }),
			);
		}
	}

	public get team() {
		return this.#team;
	}

	public get clubCode() {
		return this.#clubCode;
	}

	public get club() {
		return this.#club;
	}

	public get players() {
		return this.#players;
	}

	public async preload(relations: RelationName[] | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			club: async () => {
				this.#club = await getClub(this.#clubCode);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
