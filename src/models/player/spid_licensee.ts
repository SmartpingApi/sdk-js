import type { DateTime } from 'luxon';

import {
	createDate,
	nonNullableDateFactory,
	stringifyDate,
} from '#src/helpers/datetime_helpers.js';
import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	idlicence: string;
	licence: string;
	nom: string;
	prenom: string;
	numclub: string;
	nomclub: string;
	sexe: string;
	type: string;
	certif: string;
	validation: string;
	echelon: string;
	place: string;
	point: string;
	cat: string;
};

export class SmartpingSPIDLicensee extends BaseModel {
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

	/** Points officiels */
	readonly #officialPoints: number;

	/** Catégorie d'âge */
	readonly #ageCategory: string;

	constructor(properties: NewProperties) {
		super();
		this.#licenceId = this.setOrFallback(properties.idlicence, 0, Number);
		this.#licence = this.setOrFallback(properties.licence, 0);
		this.#lastname = this.setOrFallback(properties.nom, '');
		this.#firstname = this.setOrFallback(properties.prenom, '');
		this.#clubName = this.setOrFallback(properties.nomclub, '');
		this.#clubCode = this.setOrFallback(properties.numclub, '');
		this.#gender = this.setOrFallback(properties.sexe, '');
		this.#licenceType = this.setOrFallback(properties.type, '');
		this.#certificateType = this.setOrFallback(properties.certif, '');
		this.#validatedAt = this.setOrFallback(
			properties.validation,
			createDate(),
			nonNullableDateFactory(),
		);
		this.#level = this.setOrFallback(properties.echelon, undefined);
		this.#place = this.setOrFallback(properties.place, undefined, Number);
		this.#officialPoints = this.setOrFallback(properties.point, 0, Number);
		this.#ageCategory = this.setOrFallback(properties.cat, '');
	}

	public get licenceId() {
		return this.#licenceId;
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

	public get ageCategory() {
		return this.#ageCategory;
	}

	public get gender() {
		return this.#gender;
	}

	public get licenceType() {
		return this.#licenceType;
	}

	public get certificateType() {
		return this.#certificateType;
	}

	public get validatedAt() {
		return this.#validatedAt;
	}

	public get level() {
		return this.#level;
	}

	public get place() {
		return this.#place;
	}

	public get officialPoints() {
		return this.#officialPoints;
	}

	public serialize() {
		return {
			licenceId: this.#licenceId,
			licence: this.#licence,
			lastname: this.#lastname,
			firstname: this.#firstname,
			clubName: this.#clubName,
			clubCode: this.#clubCode,
			ageCategory: this.#ageCategory,
			gender: this.#gender,
			licenceType: this.#licenceType,
			certificateType: this.#certificateType,
			validatedAt: stringifyDate(this.#validatedAt),
			level: this.#level,
			place: this.#place,
			officialPoints: this.#officialPoints,
		};
	}
}
