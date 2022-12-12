import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'
import { createDate } from '../../helpers/datetime-helpers'

export interface PlayerDetailsConstructorProperties {
	idlicence: number;
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
	point: number;
	cat: string;
	pointm: number;
	apointm: number;
	initm: number;
	mutation: string;
	natio: string;
	arb: string;
	ja: string;
	tech: string;
}

export default class PlayerDetails extends SmartpingObject {
	readonly #id: number;
	readonly #licence: string;
	readonly #lastname: string;
	readonly #firstname: string;
	readonly #clubCode: string;
	readonly #clubName: string;
	readonly #gender: string;
	readonly #licenceType: string;
	readonly #certificate: string;
	readonly #validatedAt?: Date;
	readonly #tier: string;
	readonly #place?: number;
	readonly #points: number;
	readonly #licenceCategory: string;
	readonly #monthlyPoints: number;
	readonly #previousMonthlyPoints: number;
	readonly #startingPoints: number;
	readonly #mutedAt?: Date;
	readonly #nationality: string;
	readonly #higherRefereeGrade?: string;
	readonly #higherUmpireGrade?: string;
	readonly #higherTechnicGrade?: string;

	constructor (properties: PlayerDetailsConstructorProperties) {
		super();

		this.#id = isEmpty(properties.idlicence) ? 0 : Number(properties.idlicence);
		this.#licence = isEmpty(properties.licence) ? '' : properties.licence;
		this.#lastname = isEmpty(properties.nom) ? '' : properties.nom;
		this.#firstname = isEmpty(properties.prenom) ? '' : properties.prenom;
		this.#clubCode = isEmpty(properties.numclub) ? '' : properties.numclub;
		this.#clubName = isEmpty(properties.nomclub) ? '' : properties.nomclub;
		this.#gender = isEmpty(properties.sexe) ? '' : properties.sexe;
		this.#licenceType = isEmpty(properties.type) ? '' : properties.type;
		this.#certificate = isEmpty(properties.certif) ? '' : properties.certif;
		this.#validatedAt = isEmpty(properties.validation) ? undefined : createDate(properties.validation, 'DD/MM/YYYY');
		this.#tier = isEmpty(properties.echelon) ? '' : properties.echelon;
		this.#place = isEmpty(properties.place) ? undefined : Number(properties.place);
		this.#points = isEmpty(properties.point) ? 0 : Number(properties.point);
		this.#licenceCategory = isEmpty(properties.cat) ? '' : properties.cat;
		this.#monthlyPoints = isEmpty(properties.pointm) ? 0 : Number(properties.pointm);
		this.#previousMonthlyPoints = isEmpty(properties.apointm) ? 0 : Number(properties.apointm);
		this.#startingPoints = isEmpty(properties.initm) ? 0 : Number(properties.initm);
		this.#mutedAt = isEmpty(properties.mutation) ? undefined : createDate(properties.mutation, 'DD/MM/YYYY');
		this.#nationality = isEmpty(properties.natio) ? '' : properties.natio;
		this.#higherRefereeGrade = isEmpty(properties.arb) ? undefined : properties.arb;
		this.#higherUmpireGrade = isEmpty(properties.ja) ? undefined : properties.ja;
		this.#higherTechnicGrade = isEmpty(properties.tech) ? undefined : properties.tech;
	}

	public id(): number {
		return this.#id;
		}

	public licence(): string {
		return this.#licence;
		}

	public lastname(): string {
		return this.#lastname;
		}

	public firstname(): string {
		return this.#firstname;
		}

	public clubCode(): string {
		return this.#clubCode;
		}

	public clubName(): string {
		return this.#clubName;
		}

	public gender(): string {
		return this.#gender;
		}

	public licenceType(): string {
		return this.#licenceType;
		}

	public certificate(): string {
		return this.#certificate;
		}

	public validatedAt(): Date|undefined {
		return this.#validatedAt;
	}

	public tier(): string {
		return this.#tier;
	}

	public place(): number|undefined {
		return this.#place;
	}

	public points(): number {
		return this.#points;
	}

	public licenceCategory(): string {
		return this.#licenceCategory;
	}

	public monthlyPoints(): number {
		return this.#monthlyPoints;
	}

	public previousMonthlyPoints(): number {
		return this.#previousMonthlyPoints;
	}

	public startingPoints(): number {
		return this.#startingPoints;
	}

	public mutedAt(): Date|undefined {
		return this.#mutedAt;
	}

	public nationality(): string {
		return this.#nationality;
	}

	public higherRefereeGrade(): string|undefined {
		return this.#higherRefereeGrade;
	}

	public higherUmpireGrade(): string|undefined {
		return this.#higherUmpireGrade;
	}

	public higherTechnicGrade(): string|undefined {
		return this.#higherTechnicGrade;
	}

	public monthlyProgression(): number {
		return this.#monthlyPoints - this.#previousMonthlyPoints;
	}

	public yearlyProgression(): number {
		return this.#monthlyPoints - this.#startingPoints;
	}

	public expectedMonthlyProgression(): number {
		return this.#points - this.#previousMonthlyPoints;
	}

	public expectedYearlyProgression(): number {
		return this.#points - this.#startingPoints;
	}
}
