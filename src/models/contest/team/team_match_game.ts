import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	ja: string;
	scorea: number|'-';
	jb: string;
	scoreb: number|'-';
	detail: string;
};

export class SmartpingTeamMatchGame extends BaseModel {
	/** Nom du joueur côté A */
	readonly #playerA: string;

	/** Nom du joueur côté W */
	readonly #playerB: string;

	/** Score du joueur côté A */
	readonly #scoreA: number;

	/** Score du joueur côté W */
	readonly #scoreB: number;

	/**
	 * Scores brut.
	 * Exemple : "9 -8 11 -6 0"
	 */
	readonly #scores: string;

	/** Scores formatés */
	readonly #scoresDetailed: { playerA: number; playerB: number }[];

	constructor(properties: NewProperties) {
		super();
		this.#playerA = this.setOrFallback(properties.ja, '');
		this.#playerB = this.setOrFallback(properties.jb, '');
		this.#scoreA = properties.scorea === '-' ? 0 : Number(properties.scorea);
		this.#scoreB = properties.scoreb === '-' ? 0 : Number(properties.scoreb);
		this.#scores = this.setOrFallback(properties.detail, '');
		this.#scoresDetailed = this.#scores.split(' ').map((score) => {
			const isWon = score.startsWith('-');
			const baseScore = isWon ? Number(score.slice(1)) : Number(score);

			return this.#computeScore(baseScore, isWon);
		});
	}

	#computeScore(score: number, isWon: boolean) {
		let otherScore = 11;

		if (score > 9) {
			otherScore = score + 2;
		}

		return {
			playerA: isWon ? otherScore : score,
			playerB: isWon ? score : otherScore,
		};
	}

	public get playerA() {
		return this.#playerA;
	}

	public get playerB() {
		return this.#playerB;
	}

	public get scoreA() {
		return this.#scoreA;
	}

	public get scoreB() {
		return this.#scoreB;
	}

	public get scores() {
		return this.#scores;
	}

	public get scoresDetailed() {
		return this.#scoresDetailed;
	}

	public get winner() {
		if(this.#scoreA === this.#scoreB) {
			return;
		}

		return this.#scoreA > this.#scoreB ? this.#playerA : this.#playerB;
	}

	public serialize() {
		return {
			playerA: this.#playerA,
			playerB: this.#playerB,
			winner: this.winner,
			scores: this.#scores,
			scoresDetailed: this.#scoresDetailed,
		};
	}
}
