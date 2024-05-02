import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingClubDetail } from '#src/models/club/club_detail.js';
import type { SmartpingClubTeam } from '#src/models/club/club_team.js';
import { SmartpingTeamMatchPlayer } from '#src/models/contest/team/team_match_player.js';
import { getClub } from '#src/queries/clubs/find_by_code.js';

type NewProperties = {
	team: SmartpingClubTeam;
	letter: 'A' | 'B';
	clubCode: string;
	players: Array<{
		xja: string;
		xca: string;
		xjb: string;
		xcb: string;
	}>
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
	#players: Record<'teamA' | 'teamB', Array<SmartpingTeamMatchPlayer>> = {
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

	public async preload(relations: Array<RelationName> | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			club: async () => {
				this.#club = await getClub(this.#clubCode);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
