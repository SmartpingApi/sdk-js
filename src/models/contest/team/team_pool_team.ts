import type { Preloads } from '#src/models/base_model.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingClubDetail } from '#src/models/club/club_detail.js';
import type { SmartpingClubTeam } from '#src/models/club/club_team.js';
import { GetClub } from '#src/queries/clubs/get_club.js';
import { GetTeamsForClub } from '#src/queries/clubs/get_teams.js';
import type { SmartpingContext } from '#src/smartping.js';

type NewProperties = {
	poule: string;
	clt: string;
	equipe: string;
	joue: string;
	pts: string;
	numero: string;
	totvic: string;
	totdef: string;
	idequipe: string;
	idclub: string;
	vic: string;
	def: string;
	nul: string;
	pf: string;
	pg: string;
	pp: string;
};

type RelationName = 'club' | 'team';

export class SmartpingTeamPoolTeam extends BaseModel {
	/** Nom de la poule */
	readonly #poolName: string;

	/** Rang au sein de la poule */
	readonly #rank: number;

	/** Nom de l'équipe */
	readonly #teamName: string;

	/** Nombre de rencontres jouées */
	readonly #totalPlayed: number;

	/** Nombre de points */
	readonly #score: number;

	/** Numéro du club */
	readonly #clubCode: string;

	/** Nombre de rencontres gagnées */
	readonly #totalGamesWon: number;

	/** Nombre de rencontres perdues */
	readonly #totalGamesLost: number;

	/** Identifiant de l'équipe */
	readonly #teamId: number;

	/** Identifiant du club */
	readonly #clubId: number;

	/** Nombre de victoires */
	readonly #victories: number;

	/** Nombre de défaites */
	readonly #defeats: number;

	/** Nombre de matchs nuls */
	readonly #draws: number;

	/** Nombre de pénalités/forfaits */
	readonly #forfeits: number;

	/** Nombre total de parties gagnées */
	readonly #gameWon: number;

	/** Nombre total de parties perdues */
	readonly #gameLost: number;

	#club: SmartpingClubDetail | undefined;
	#team: SmartpingClubTeam | undefined;

	constructor(properties: NewProperties, private readonly context: SmartpingContext) {
		super();
		this.#poolName = this.setOrFallback(properties.poule, '');
		this.#rank = this.setOrFallback(properties.clt, 0, Number);
		this.#teamName = this.setOrFallback(properties.equipe, '');
		this.#totalPlayed = this.setOrFallback(properties.joue, 0, Number);
		this.#score = this.setOrFallback(properties.pts, 0, Number);
		this.#clubCode = this.setOrFallback(properties.numero, '');
		this.#totalGamesWon = this.setOrFallback(properties.totvic, 0, Number);
		this.#totalGamesLost = this.setOrFallback(properties.totdef, 0, Number);
		this.#teamId = this.setOrFallback(properties.idequipe, 0, Number);
		this.#clubId = this.setOrFallback(properties.idclub, 0, Number);
		this.#victories = this.setOrFallback(properties.vic, 0, Number);
		this.#defeats = this.setOrFallback(properties.def, 0, Number);
		this.#draws = this.setOrFallback(properties.nul, 0, Number);
		this.#forfeits = this.setOrFallback(properties.pf, 0, Number);
		this.#gameWon = this.setOrFallback(properties.pg, 0, Number);
		this.#gameLost = this.setOrFallback(properties.pp, 0, Number);
	}

	public get poolName() {
		return this.#poolName;
	}

	public get rank() {
		return this.#rank;
	}

	public get teamName() {
		return this.#teamName;
	}

	public get totalPlayed() {
		return this.#totalPlayed;
	}

	public get score() {
		return this.#score;
	}

	public get clubCode() {
		return this.#clubCode;
	}

	public get totalGamesWon() {
		return this.#totalGamesWon;
	}

	public get totalGamesLost() {
		return this.#totalGamesLost;
	}

	public get teamId() {
		return this.#teamId;
	}

	public get clubId() {
		return this.#clubId;
	}

	public get victories() {
		return this.#victories;
	}

	public get defeats() {
		return this.#defeats;
	}

	public get draws() {
		return this.#draws;
	}

	public get forfeits() {
		return this.#forfeits;
	}

	public get gameWon() {
		return this.#gameWon;
	}

	public get gameLost() {
		return this.#gameLost;
	}

	public get club() {
		return this.#club;
	}

	public get team() {
		return this.#team;
	}

	public serialize() {
		return {
			poolName: this.poolName,
			rank: this.rank,
			teamName: this.teamName,
			totalPlayed: this.totalPlayed,
			score: this.score,
			clubCode: this.clubCode,
			totalGamesWon: this.totalGamesWon,
			totalGamesLost: this.totalGamesLost,
			teamId: this.teamId,
			clubId: this.clubId,
			victories: this.victories,
			defeats: this.defeats,
			draws: this.draws,
			forfeits: this.forfeits,
			gameWon: this.gameWon,
			gameLost: this.gameLost,
		};
	}

	async preload(relations: Array<RelationName> | '*') {
		const preloadFunctions: Preloads<RelationName> = {
			club: async () => {
				this.#club = await GetClub.create(this.context).run(this.#clubCode);
			},
			team: async () => {
				const teams = await GetTeamsForClub.create(this.context).run(this.#clubCode, 'none');
				this.#team = teams.find((team) => team.id === this.#teamId);
			},
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
