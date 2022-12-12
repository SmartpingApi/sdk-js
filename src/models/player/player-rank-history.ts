import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'

export interface PlayerRankHistoryConstructorProperties {
	echelon: string;
	place: number;
	point: number;
	saison: string;
	phase: number;
}

export default class PlayerRankHistory extends SmartpingObject {
	readonly #level: string;
	readonly #rank: number;
	readonly #points: number;
	readonly #season: string;
	readonly #phase: number;

	constructor (properties: PlayerRankHistoryConstructorProperties) {
		super();

		this.#level = isEmpty(properties.echelon) ? '' : properties.echelon;
		this.#rank = isEmpty(properties.place) ? 0 : properties.place;
		this.#points = isEmpty(properties.point) ? 0 : properties.point;
		this.#season = isEmpty(properties.saison) ? '' : properties.saison;
		this.#phase = isEmpty(properties.phase) ? 0 : properties.phase;
	}

	public level(): string {
		return this.#level;
	}

	public rank(): number {
		return this.#rank;
	}

	public points(): number {
		return this.#points;
	}

	public season(): string {
		return this.#season;
	}

	public phase(): number {
		return this.#phase;
	}
}
