import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	licence: string;
	nom: string;
	prenom: string;
	club: string;
	nclub: string;
	natio: string;
	clglob: string;
	point: string;
	aclglob: string;
	apoint: string;
	clast: string;
	clnat: string;
	categ: string;
	rangreg: string;
	rangdep: string;
	valcla: string;
	clpro: string;
	valinit: string;
};

export class SmartpingRankedLicensee extends BaseModel {
	/** Numéro de licence */
	readonly #licence: number;

	/** Nom */
	readonly #lastname: string;

	/** Prénom */
	readonly #firstname: string;

	/** Nom du club */
	readonly #clubName: string;

	/** Numéro du club */
	readonly #clubCode: string;

	/** Nationalité (E = étranger) */
	readonly #nationality: string | undefined;

	/** Classement national (étrangers inclus) */
	readonly #nationalRank: number;

	/** Points de la situation mensuelle */
	readonly #monthlyPoints: number;

	/** Ancien classement national (étrangers inclus) */
	readonly #previousNationalRank: number;

	/** Ancienne situation mensuelle */
	readonly #previousMonthlyPoints: number;

	/** Classement officiel */
	readonly #pointsRank: number;

	/** Classement national (hors étrangers) */
	readonly #nationalRankWithoutForeigners: number;

	/** Catégorie d'âge */
	readonly #ageCategory: string;

	/** Rang régional */
	readonly #regionalRank: number;

	/** Rang départemental */
	readonly #departmentalRank: number;

	/** Points officiels */
	readonly #officialPoints: number;

	/** Proposition de classement */
	readonly #proposedRank: number;

	/** Valeur en début de saison */
	readonly #startingPoints: number;

	constructor(properties: NewProperties) {
		super();
		this.#licence = this.setOrFallback(properties.licence, 0);
		this.#lastname = this.setOrFallback(properties.nom, '');
		this.#firstname = this.setOrFallback(properties.prenom, '');
		this.#clubName = this.setOrFallback(properties.club, '');
		this.#clubCode = this.setOrFallback(properties.nclub, '');
		this.#pointsRank = this.setOrFallback(properties.clast, 0, Number);
		this.#nationality = this.setOrFallback(properties.natio, undefined);
		this.#nationalRank = this.setOrFallback(properties.clglob, 0, Number);
		this.#monthlyPoints = this.setOrFallback(properties.point, 0, Number);
		this.#previousNationalRank = this.setOrFallback(properties.aclglob, 0, Number);
		this.#previousMonthlyPoints = this.setOrFallback(properties.apoint, 0, Number);
		this.#nationalRankWithoutForeigners = this.setOrFallback(properties.clnat, 0, Number);
		this.#ageCategory = this.setOrFallback(properties.categ, '');
		this.#regionalRank = this.setOrFallback(properties.rangreg, 0, Number);
		this.#departmentalRank = this.setOrFallback(properties.rangdep, 0, Number);
		this.#officialPoints = this.setOrFallback(properties.valcla, 0, Number);
		this.#proposedRank = this.setOrFallback(properties.clpro, 0, Number);
		this.#startingPoints = this.setOrFallback(properties.valinit, 0, Number);
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

	public get pointsRank() {
		return this.#pointsRank;
	}

	public get nationality() {
		return this.#nationality;
	}

	public get nationalRank() {
		return this.#nationalRank;
	}

	public get monthlyPoints() {
		return this.#monthlyPoints;
	}

	public get previousNationalRank() {
		return this.#previousNationalRank;
	}

	public get previousMonthlyPoints() {
		return this.#previousMonthlyPoints;
	}

	public get nationalRankWithoutForeigners() {
		return this.#nationalRankWithoutForeigners;
	}

	public get ageCategory() {
		return this.#ageCategory;
	}

	public get regionalRank() {
		return this.#regionalRank;
	}

	public get departmentalRank() {
		return this.#departmentalRank;
	}

	public get officialPoints() {
		return this.#officialPoints;
	}

	public get proposedRank() {
		return this.#proposedRank;
	}

	public get startingPoints() {
		return this.#startingPoints;
	}

	public serialize() {
		return {
			licence: this.#licence,
			lastname: this.#lastname,
			firstname: this.#firstname,
			clubName: this.#clubName,
			clubCode: this.#clubCode,
			pointsRank: this.#pointsRank,
			nationalRank: this.#nationalRank,
			monthlyPoints: this.#monthlyPoints,
			previousNationalRank: this.#previousNationalRank,
			previousMonthlyPoints: this.#previousMonthlyPoints,
			nationalRankWithoutForeigners: this.#nationalRankWithoutForeigners,
			ageCategory: this.#ageCategory,
			regionalRank: this.#regionalRank,
			departmentalRank: this.#departmentalRank,
			officialPoints: this.#officialPoints,
			proposedRank: this.#proposedRank,
			startingPoints: this.#startingPoints,
		};
	}
}
