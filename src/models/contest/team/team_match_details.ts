import { BaseModel, type Preloads } from '@/models/base_model.js';
import { SmartpingTeamMatchTeam } from '@/models/contest/team/team_match_team.js';
import { SmartpingTeamMatchGame } from '@/models/contest/team/team_match_game.js';
import { getTeamsForClub, TeamTypes } from '@/queries/clubs/get_teams.js';

type NewProperties = {
	resultat: {
		equa: string;
		equb: string;
		resa: number;
		resb: number;
	};
	joueur: {
		xja: string;
		xca: string;
		xjb: string;
		xcb: string;
	}[];
	partie: {
		ja: string;
		scorea: number|'-';
		jb: string;
		scoreb: number|'-';
		detail: string;
	}[];
	extras: {
		matchId: number;
		teamAId: number;
		teamBId: number;
		clubACode: string;
		clubBCode: string;
		phase: number;
	};
};

type RelationName = 'teams';

export class SmartpingTeamMatchDetails extends BaseModel {
	/** Nom de l'équipe du côté A */
	readonly #teamAName: string;

	/** Nom de l'équipe du côté W */
	readonly #teamBName: string;

	/** Score de l'équipe du côté A */
	readonly #scoreA: number;

	/** Score de l'équipe du côté W */
	readonly #scoreB: number;

	/** Parties de la rencontre */
	readonly #games: SmartpingTeamMatchGame[] = [];

	/** Interne : Paramètres supplémentaires passés lors de la requête */
	readonly #extras: NewProperties['extras'];

	/** Interne : Liste des joueurs de la rencontre */
	readonly #players: NewProperties['joueur'];

	/** Équipe A */
	#teamA: SmartpingTeamMatchTeam | undefined;

	/** Équipe W */
	#teamB: SmartpingTeamMatchTeam | undefined;

	constructor(properties: NewProperties) {
		super();
		this.#teamAName = this.setOrFallback(properties.resultat.equa, '');
		this.#teamBName = this.setOrFallback(properties.resultat.equb, '');
		this.#scoreA = this.setOrFallback(properties.resultat.resa, 0, Number);
		this.#scoreB = this.setOrFallback(properties.resultat.resb, 0, Number);
		this.#games = properties.partie.map((game) => new SmartpingTeamMatchGame(game));
		this.#extras = properties.extras;
		this.#players = properties.joueur;
	}

	public get teamA() {
		return this.#teamA;
	}

	public get teamB() {
		return this.#teamB;
	}

	public get teamAName() {
		return this.#teamAName;
	}

	public get teamBName() {
		return this.#teamBName;
	}

	public get scoreA() {
		return this.#scoreA;
	}

	public get scoreB() {
		return this.#scoreB;
	}

	public get games() {
		return this.#games;
	}

	public get winner() {
		if (this.#scoreA === this.#scoreB) {
			// eslint-disable-next-line unicorn/no-null
			return null;
		}

		return this.#scoreA > this.#scoreB ? this.#teamA : this.#teamB;
	}

	public async preload() {
		const preloadFunctions: Preloads<RelationName> = {
			teams: async () => {
				const clubATeams = await getTeamsForClub(this.#extras.clubACode, TeamTypes.None);
				const clubBTeams = await getTeamsForClub(this.#extras.clubBCode, TeamTypes.None);
				const teamA = clubATeams.find((team) => team.id === this.#extras.teamAId);
				const teamB = clubBTeams.find((team) => team.id === this.#extras.teamBId);
				this.#teamA = teamA ? new SmartpingTeamMatchTeam({ team: teamA, clubCode: this.#extras.clubACode, players: this.#players, letter: 'A' }) : undefined;
				this.#teamB = teamB ? new SmartpingTeamMatchTeam({ team: teamB, clubCode: this.#extras.clubBCode, players: this.#players, letter: 'B' }) : undefined;
			},
		};

		return this.preloadRelations('*', preloadFunctions);
	}
}
