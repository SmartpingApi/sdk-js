import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	echelon: string;
	place: number;
	point: number;
	saison: string;
	phase: number;
}

export class SmartpingPlayerRankHistory extends BaseModel {
	/** "N" si numéroté */
	readonly #level: string;

	/** Place si numéroté */
	readonly #rank: number;

	/** Points officiels */
	readonly #points: number;

	/** Saison */
	readonly #season: string;

	/** Phase */
	readonly #phase: number;

	constructor (properties: NewProperties) {
		super();
		this.#level = this.setOrFallback(properties.echelon, '');
		this.#rank = this.setOrFallback(properties.place, 0, Number);
		this.#points = this.setOrFallback(properties.point, 0, Number);
		this.#season = this.setOrFallback(properties.saison, '');
		this.#phase = this.setOrFallback(properties.phase, 0, Number);
	}

	public get level() {
		return this.#level;
	}

	public get rank() {
		return this.#rank;
	}

	public get points() {
		return this.#points;
	}

	public get season() {
		return this.#season;
	}

	public get phase() {
		return this.#phase;
	}
}
