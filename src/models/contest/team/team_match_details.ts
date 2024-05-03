import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import { SmartpingTeamMatchGame } from '#src/models/contest/team/team_match_game.js';
import { SmartpingTeamMatchTeam } from '#src/models/contest/team/team_match_team.js';
import { GetTeamsForClub } from '#src/queries/clubs/get_teams.js';
import type { SmartpingContext } from '#src/smartping.js';

type NewProperties = {
	resultat: {
		equa: string;
		equb: string;
		resa: string;
		resb: string;
	};
	joueur: Array<{
		xja: string;
		xca: string;
		xjb: string;
		xcb: string;
	}>;
	partie: Array<{
		ja: string;
		scorea: string;
		jb: string;
		scoreb: string;
		detail: string;
	}>;
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
	readonly #games: Array<SmartpingTeamMatchGame> = [];

	/** Interne : Paramètres supplémentaires passés lors de la requête */
	readonly #extras: NewProperties['extras'];

	/** Interne : Liste des joueurs de la rencontre */
	readonly #players: NewProperties['joueur'];

	/** Équipe A */
	#teamA: SmartpingTeamMatchTeam | undefined;

	/** Équipe W */
	#teamB: SmartpingTeamMatchTeam | undefined;

	constructor(properties: NewProperties, private readonly context: SmartpingContext) {
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

	public serialize() {
		return {
			teamAName: this.#teamAName,
			teamBName: this.#teamBName,
			scoreA: this.#scoreA,
			scoreB: this.#scoreB,
		};
	}

	public async preload() {
		const preloadFunctions: Preloads<RelationName> = {
			teams: async () => {
				const clubATeams = await GetTeamsForClub.create(this.context).run(
					this.#extras.clubACode,
					'none',
				);
				const clubBTeams = await GetTeamsForClub.create(this.context).run(
					this.#extras.clubBCode,
					'none',
				);
				const teamA = clubATeams.find((team) => team.id === this.#extras.teamAId);
				const teamB = clubBTeams.find((team) => team.id === this.#extras.teamBId);
				this.#teamA = teamA
					? new SmartpingTeamMatchTeam(
							{
								team: teamA,
								clubCode: this.#extras.clubACode,
								players: this.#players,
								letter: 'A',
							},
							this.context,
					  )
					: undefined;
				this.#teamB = teamB
					? new SmartpingTeamMatchTeam(
							{
								team: teamB,
								clubCode: this.#extras.clubBCode,
								players: this.#players,
								letter: 'B',
							},
							this.context,
					  )
					: undefined;
			},
		};

		return this.preloadRelations('*', preloadFunctions);
	}
}
