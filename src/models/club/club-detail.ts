import { SmartpingObject } from '../smartping-object'
import { createDate } from '../../helpers/datetime-helpers'
import { isEmpty, stringifyDate } from '../../helpers/validation'

export interface ClubDetailConstructorProperties {
	idclub: string;
	numero: string;
	nom: string;
	nomsalle: string;
	adressesalle1: string;
	adressesalle2?: string;
	adressesalle3?: string;
	codepsalle: string;
	villesalle: string;
	web?: string;
	nomcor: string;
	prenomcor: string;
	mailcor?: string;
	telcor?: string;
	latitude?: string;
	longitude?: string;
	datevalidation?: string;
}

export interface ClubDetailExportProperties {
	id: number;
	code: string;
	name: string;
	hallName: string;
	hallAddress1: string;
	hallAddress2?: string;
	hallAddress3?: string;
	hallPostalCode: string;
	hallCity: string;
	website?: string;
	contactLastname: string;
	contactFirstname: string;
	contactMail?: string;
	contactPhone?: string;
	latitude?: number;
	longitude?: number;
	validatedAt?: string;
}

export default class ClubDetail extends SmartpingObject {
	readonly #id: number;
	readonly #code: string;
	readonly #name: string;
	readonly #hallName: string;
	readonly #hallAddress1: string;
	readonly #hallAddress2?: string;
	readonly #hallAddress3?: string;
	readonly #hallPostalCode: string;
	readonly #hallCity: string;
	readonly #website?: string;
	readonly #contactLastname: string;
	readonly #contactFirstname: string;
	readonly #contactMail?: string;
	readonly #contactPhone?: string;
	readonly #latitude?: number;
	readonly #longitude?: number;
	readonly #validatedAt?: Date;

	constructor (properties: ClubDetailConstructorProperties) {
		super();

		this.#id = Number(properties.idclub);
		this.#code = isEmpty(properties.numero) ? '' : properties.numero;
		this.#name = isEmpty(properties.nom) ? '' : properties.nom;
		this.#hallName = isEmpty(properties.nomsalle) ? '' : properties.nomsalle;
		this.#hallAddress1 = isEmpty(properties.adressesalle1) ? '' : properties.adressesalle1;
		this.#hallAddress2 = isEmpty(properties.adressesalle2) ? undefined : properties.adressesalle2;
		this.#hallAddress3 = isEmpty(properties.adressesalle3) ? undefined : properties.adressesalle3;
		this.#hallPostalCode = isEmpty(properties.codepsalle) ? '' : properties.codepsalle;
		this.#hallCity = isEmpty(properties.villesalle) ? '' : properties.villesalle;
		this.#website = isEmpty(properties.web) ? undefined : properties.web;
		this.#contactLastname = isEmpty(properties.nomcor) ? '' : properties.nomcor;
		this.#contactFirstname = isEmpty(properties.prenomcor) ? '' : properties.prenomcor;
		this.#contactMail = isEmpty(properties.mailcor) ? undefined : properties.mailcor;
		this.#contactPhone = isEmpty(properties.telcor) ? undefined : properties.telcor;
		this.#latitude = isEmpty(properties.latitude) ? undefined : Number.parseFloat(properties.latitude as string);
		this.#longitude = isEmpty(properties.longitude) ? undefined : Number.parseFloat(properties.longitude as string);
		this.#validatedAt = isEmpty(properties.datevalidation) ? undefined : createDate(properties.datevalidation, 'DD/MM/YYYY');
	}

	public id(): number {
		return this.#id;
	}

	public code(): string {
		return this.#code;
	}

	public name(): string {
		return this.#name;
	}

	public hallName(): string {
		return this.#hallName;
	}

	public hallAddress1(): string {
		return this.#hallAddress1;
	}

	public hallAddress2(): string|undefined {
		return this.#hallAddress2;
	}

	public hallAddress3(): string|undefined {
		return this.#hallAddress3;
	}

	public hallPostalCode(): string {
		return this.#hallPostalCode;
	}

	public hallCity(): string {
		return this.#hallCity;
	}

	public fullAddress(): string {
		let address = `${this.#hallName} - ${this.#hallAddress1}`;

		if (this.#hallAddress2) {
			address += ` - ${this.#hallAddress2}`;
		}

		if (this.#hallAddress3) {
			address += ` - ${this.#hallAddress3}`;
		}

		address += ` - {$this->hallPostalCode} ${this.hallCity}`;
		return address;
	}

	public website() : string|undefined {
		return this.#website;
	}

	public contactLastname() : string {
		return this.#contactLastname;
	}

	public contactFirstname() : string {
		return this.#contactFirstname;
	}

	public contactMail() : string|undefined {
		return this.#contactMail;
	}

	public contactPhone() : string|undefined {
		return this.#contactPhone;
	}

	public latitude() : number|undefined {
		return this.#latitude;
	}

	public longitude() : number|undefined {
		return this.#longitude;
	}

	public validatedAt() : Date|undefined {
		return this.#validatedAt;
	}

	public normalize(): ClubDetailExportProperties {
		return {
			id: this.#id,
			code: this.#code,
			name: this.#name,
			hallName: this.#hallName,
			hallAddress1: this.#hallAddress1,
			hallAddress2: this.#hallAddress2,
			hallAddress3: this.#hallAddress3,
			hallPostalCode: this.#hallPostalCode,
			hallCity: this.#hallCity,
			website: this.#website,
			contactLastname: this.#contactLastname,
			contactFirstname: this.#contactFirstname,
			contactMail: this.#contactMail,
			contactPhone: this.#contactPhone,
			latitude: this.#latitude,
			longitude: this.#longitude,
			validatedAt: stringifyDate(this.#validatedAt),
		};
	}
}
