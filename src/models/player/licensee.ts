import type { DateTime } from 'luxon';

import { createDate, stringifyDate } from '#src/helpers/datetime_helpers.js';
import { BaseModel } from '#src/models/base_model.js';
import type { SmartpingRankedLicensee } from '#src/models/player/ranked_licensee.js';
import type { SmartpingSPIDLicensee } from '#src/models/player/spid_licensee.js';

export class SmartpingLicensee extends BaseModel {
	/** ID interne à la Fédération */
	readonly #licenceId: number;

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

	/** Sexe */
	readonly #gender: string;

	/** Type de licence */
	readonly #licenceType: string;

	/** Type de certificat */
	readonly #certificateType: string;

	/** Date de validation */
	readonly #validatedAt: DateTime;

	/** Échelon national */
	readonly #level: 'N' | undefined;

	/** Place nationale */
	readonly #place: number | undefined;

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

	constructor(rankedLicensee?: SmartpingRankedLicensee, SPIDLicensee?: SmartpingSPIDLicensee) {
		super();
		this.#licenceId = this.setOrFallback(SPIDLicensee?.licenceId, 0, Number);
		this.#licence = this.setOrFallback(rankedLicensee?.licence, 0, Number);
		this.#firstname = this.setOrFallback(rankedLicensee?.firstname, '');
		this.#lastname = this.setOrFallback(rankedLicensee?.lastname, '');
		this.#clubName = this.setOrFallback(rankedLicensee?.clubName, '');
		this.#clubCode = this.setOrFallback(rankedLicensee?.clubCode, '');
		this.#gender = this.setOrFallback(SPIDLicensee?.gender, '');
		this.#level = this.setOrFallback(SPIDLicensee?.level, undefined);
		this.#place = this.setOrFallback(SPIDLicensee?.place, undefined);
		this.#licenceType = this.setOrFallback(SPIDLicensee?.licenceType, '');
		this.#certificateType = this.setOrFallback(SPIDLicensee?.certificateType, '');
		this.#validatedAt = SPIDLicensee?.validatedAt ?? createDate();
		this.#nationality = this.setOrFallback(rankedLicensee?.nationality, undefined);
		this.#nationalRank = this.setOrFallback(rankedLicensee?.nationalRank, 0);
		this.#monthlyPoints = this.setOrFallback(rankedLicensee?.monthlyPoints, 0);
		this.#previousNationalRank = this.setOrFallback(rankedLicensee?.previousNationalRank, 0);
		this.#previousMonthlyPoints = this.setOrFallback(rankedLicensee?.previousMonthlyPoints, 0);
		this.#pointsRank = this.setOrFallback(rankedLicensee?.pointsRank, 0);
		this.#nationalRankWithoutForeigners = this.setOrFallback(
			rankedLicensee?.nationalRankWithoutForeigners,
			0,
		);
		this.#ageCategory = this.setOrFallback(rankedLicensee?.ageCategory, '');
		this.#regionalRank = this.setOrFallback(rankedLicensee?.regionalRank, 0);
		this.#departmentalRank = this.setOrFallback(rankedLicensee?.departmentalRank, 0);
		this.#officialPoints = this.setOrFallback(rankedLicensee?.officialPoints, 0);
		this.#proposedRank = this.setOrFallback(rankedLicensee?.proposedRank, 0);
		this.#startingPoints = this.setOrFallback(rankedLicensee?.startingPoints, 0);
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

	public get pointsRank() {
		return this.#pointsRank;
	}

	public get fullName() {
		return `${this.#firstname} ${this.#lastname.toLocaleUpperCase('fr-FR')}`;
	}

	public serialize() {
		return {
			licenceId: this.#licenceId,
			licence: this.#licence,
			lastname: this.#lastname,
			firstname: this.#firstname,
			clubName: this.#clubName,
			clubCode: this.#clubCode,
			gender: this.#gender,
			level: this.#level,
			place: this.#place,
			pointsRank: this.#pointsRank,
			licenceType: this.#licenceType,
			certificateType: this.#certificateType,
			validatedAt: stringifyDate(this.#validatedAt),
			nationality: this.#nationality,
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
