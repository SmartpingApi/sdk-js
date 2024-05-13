import type { DateTime } from 'luxon';

import { dateFactory, stringifyDate } from '#src/helpers/datetime_helpers.js';
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
	pointm: string;
	apointm: string;
	initm: string;
	mutation: string;
	natio: string;
	arb: string;
	ja: string;
	tech: string;
};

export class SmartpingPlayerDetails extends BaseModel {
	/** ID interne pour la Fédération */
	readonly #id: number;

	/** Numéro de licence */
	readonly #licence: string;

	/** Nom */
	readonly #lastname: string;

	/** Prénom */
	readonly #firstname: string;

	/** Numéro de club */
	readonly #clubCode: string;

	/** Nom du club */
	readonly #clubName: string;

	/** Genre */
	readonly #gender: string;

	/**
	 * Type de licence.
	 * - T = Traditionnelle
	 * - P = Promotionnelle
	 */
	readonly #licenceType: string;

	/**
	 * Certificat médical.
	 * - C = Certificat présenté
	 * - N = Ni entraînement ni compétition
	 * - Q = Quadruple
	 */
	readonly #certificate: string;

	/** Date de validation */
	readonly #validatedAt: DateTime | undefined;

	/** "N" si numéroté */
	readonly #tier: string | undefined;

	/** Place si numéroté */
	readonly #place: number | undefined;

	/** Points officiels */
	readonly #points: number;

	/** Catégorie de licence */
	readonly #licenceCategory: string;

	/** Points mensuels */
	readonly #monthlyPoints: number;

	/** Anciens points mensuels */
	readonly #previousMonthlyPoints: number;

	/** Points de début de saison */
	readonly #startingPoints: number;

	/** Date de mutation */
	readonly #mutedAt: DateTime | undefined;

	/** Nationalité */
	readonly #nationality: string;

	/** Plus haut niveau de juge-arbitre */
	readonly #higherRefereeGrade: string | undefined;

	/** Plus haut niveau d'arbitre */
	readonly #higherUmpireGrade: string | undefined;

	/** Plus haut niveau d'entraîneur */
	readonly #higherTechnicGrade: string | undefined;

	constructor(properties: NewProperties) {
		super();
		this.#id = this.setOrFallback(properties.idlicence, 0, Number);
		this.#licence = this.setOrFallback(properties.licence, '');
		this.#lastname = this.setOrFallback(properties.nom, '');
		this.#firstname = this.setOrFallback(properties.prenom, '');
		this.#clubCode = this.setOrFallback(properties.numclub, '');
		this.#clubName = this.setOrFallback(properties.nomclub, '');
		this.#gender = this.setOrFallback(properties.sexe, '');
		this.#licenceType = this.setOrFallback(properties.type, '');
		this.#certificate = this.setOrFallback(properties.certif, '');
		this.#validatedAt = this.setOrFallback(properties.validation, undefined, dateFactory());
		this.#tier = this.setOrFallback(properties.echelon, undefined);
		this.#place = this.setOrFallback(properties.place, undefined, Number);
		this.#points = this.setOrFallback(properties.point, 0, Number);
		this.#licenceCategory = this.setOrFallback(properties.cat, '');
		this.#monthlyPoints = this.setOrFallback(properties.pointm, 0, Number);
		this.#previousMonthlyPoints = this.setOrFallback(properties.apointm, 0, Number);
		this.#startingPoints = this.setOrFallback(properties.initm, 0, Number);
		this.#mutedAt = this.setOrFallback(properties.mutation, undefined, dateFactory());
		this.#nationality = this.setOrFallback(properties.natio, '');
		this.#higherRefereeGrade = this.setOrFallback(properties.arb, undefined);
		this.#higherUmpireGrade = this.setOrFallback(properties.ja, undefined);
		this.#higherTechnicGrade = this.setOrFallback(properties.tech, undefined);
	}

	public get id() {
		return this.#id;
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

	public get clubCode() {
		return this.#clubCode;
	}

	public get clubName() {
		return this.#clubName;
	}

	public get gender() {
		return this.#gender;
	}

	public get licenceType() {
		return this.#licenceType;
	}

	public get certificate() {
		return this.#certificate;
	}

	public get validatedAt() {
		return this.#validatedAt;
	}

	public get tier() {
		return this.#tier;
	}

	public get place() {
		return this.#place;
	}

	public get points() {
		return this.#points;
	}

	public get licenceCategory() {
		return this.#licenceCategory;
	}

	public get monthlyPoints() {
		return this.#monthlyPoints;
	}

	public get previousMonthlyPoints() {
		return this.#previousMonthlyPoints;
	}

	public get startingPoints() {
		return this.#startingPoints;
	}

	public get mutedAt() {
		return this.#mutedAt;
	}

	public get nationality() {
		return this.#nationality;
	}

	public get higherRefereeGrade() {
		return this.#higherRefereeGrade;
	}

	public get higherUmpireGrade() {
		return this.#higherUmpireGrade;
	}

	public get higherTechnicGrade() {
		return this.#higherTechnicGrade;
	}

	public serialize() {
		return {
			id: this.#id,
			licence: this.#licence,
			lastname: this.#lastname,
			firstname: this.#firstname,
			clubCode: this.#clubCode,
			clubName: this.#clubName,
			gender: this.#gender,
			licenceType: this.#licenceType,
			certificate: this.#certificate,
			validatedAt: stringifyDate(this.#validatedAt),
			tier: this.#tier,
			place: this.#place,
			points: this.#points,
			licenceCategory: this.#licenceCategory,
			monthlyPoints: this.#monthlyPoints,
			previousMonthlyPoints: this.#previousMonthlyPoints,
			startingPoints: this.#startingPoints,
			mutedAt: stringifyDate(this.#mutedAt),
			nationality: this.#nationality,
			higherRefereeGrade: this.#higherRefereeGrade,
			higherUmpireGrade: this.#higherUmpireGrade,
			higherTechnicGrade: this.#higherTechnicGrade,
		};
	}
}
