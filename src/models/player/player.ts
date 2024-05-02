import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingRankedPlayer } from '#src/models/player/ranked_player.js';
import type { SmartpingSPIDPlayer } from '#src/models/player/spid_player.js';

export class SmartpingPlayer extends BaseModel {
	/** Numéro de licence */
	readonly #licence: string;

	/** Nom */
	readonly #lastname: string;

	/** Prénom */
	readonly #firstname: string;

	/** Nom du club */
	readonly #clubName: string;

	/** Numéro du club */
	readonly #clubCode: string;

	/** Genre */
	readonly #gender: string | undefined;

	/** "N" si numéroté */
	readonly #level: string | undefined;

	/** Place si numéroté */
	readonly #place: number | undefined;

	/** Points officiels */
	readonly #points: number | undefined;

	/** Classement officiel */
	readonly #pointsRank: number | undefined;

	constructor(rankedPlayer?: SmartpingRankedPlayer, SPIDPlayer?: SmartpingSPIDPlayer) {
		super();
		this.#licence = SPIDPlayer?.licence ?? rankedPlayer?.licence ?? '';
		this.#firstname = SPIDPlayer?.firstname ?? rankedPlayer?.firstname ?? '';
		this.#lastname = SPIDPlayer?.lastname ?? rankedPlayer?.lastname ?? '';
		this.#clubName = SPIDPlayer?.clubName ?? rankedPlayer?.clubName ?? '';
		this.#clubCode = SPIDPlayer?.clubCode ?? rankedPlayer?.clubCode ?? '';
		this.#gender = (SPIDPlayer && (SPIDPlayer.gender === 'H' || SPIDPlayer.gender === 'F')) ? SPIDPlayer.gender : undefined;
		this.#level = SPIDPlayer && this.setOrFallback(SPIDPlayer.level, undefined);
		this.#place = SPIDPlayer && this.setOrFallback(SPIDPlayer.place, undefined);
		this.#points = SPIDPlayer && this.setOrFallback(SPIDPlayer.points, undefined);
		this.#pointsRank = rankedPlayer?.pointsRank;
	}

	public get licence() {
		return this.#licence;
	}

	public get lastname() {
		return this.#lastname;
	}

	public get firstname() {
		return this.#firstname;
	}

	public get clubName() {
		return this.#clubName;
	}

	public get clubCode() {
		return this.#clubCode;
	}

	public get gender() {
		return this.#gender;
	}

	public get level() {
		return this.#level;
	}

	public get place() {
		return this.#place;
	}

	public get points() {
		return this.#points;
	}

	public get pointsRank() {
		return this.#pointsRank;
	}

	public get fullName() {
		return `${this.#firstname} ${this.#lastname.toLocaleUpperCase('fr-FR')}`;
	}
}
