import { DateTime } from 'luxon';

import { createDate, dateFormats, stringifyDate } from '#src/helpers/datetime_helpers.js';
import { BaseModel } from '#src/models/base_model.js';

type NewProperties = {
	idclub: string;
	numero: string;
	nom: string;
	nomsalle: string;
	adressesalle1: string;
	adressesalle2: string | undefined;
	adressesalle3: string | undefined;
	codepsalle: string;
	villesalle: string;
	web: string | undefined;
	nomcor: string;
	prenomcor: string;
	mailcor: string | undefined;
	telcor: string | undefined;
	latitude: string | undefined;
	longitude: string | undefined;
	validation: string | undefined;
}

export class SmartpingClubDetail extends BaseModel {
	/** ID interne pour la Fédération */
	readonly #id: string;

	/** ID publique (numéro de club) */
	readonly #code: string;

	/** Nom */
	readonly #name: string;

	/** Nom de la salle */
	readonly #hallName: string;

	/** Adresse de la salle (ligne 1) */
	readonly #hallAddress1: string;

	/** Adresse de la salle (ligne 2) */
	readonly #hallAddress2: string | undefined;

	/** Adresse de la salle (ligne 3) */
	readonly #hallAddress3: string | undefined;

	/** Code postal de la salle */
	readonly #hallPostalCode: string;

	/** Ville de la salle */
	readonly #hallCity: string;

	/** Site web */
	readonly #website: string | undefined;

	/** Nom du correspondant */
	readonly #contactLastname: string;

	/** Prénom du correspondant */
	readonly #contactFirstname: string;

	/** Mail du correspondant */
	readonly #contactMail: string | undefined;

	/** Téléphone du correspondant */
	readonly #contactPhone: string | undefined;

	/** Géolocalisation de la salle : latitude */
	readonly #latitude: string | undefined;

	/** Géolocalisation de la salle : longitude */
	readonly #longitude: string | undefined;

	/** Date de validation (pour la saison en cours) */
	readonly #validatedAt: DateTime | undefined;

	constructor(properties: NewProperties) {
		super();
		console.log({ name: properties.nom, date: properties.validation })
		this.#id = this.setOrFallback(properties.idclub, '');
		this.#code = this.setOrFallback(properties.numero, '');
		this.#name = this.setOrFallback(properties.nom, '');
		this.#hallName = this.setOrFallback(properties.nomsalle, '');
		this.#hallAddress1 = this.setOrFallback(properties.adressesalle1, '');
		this.#hallAddress2 = this.setOrFallback(properties.adressesalle2, undefined);
		this.#hallAddress3 = this.setOrFallback(properties.adressesalle3, undefined);
		this.#hallPostalCode = this.setOrFallback(properties.codepsalle, '');
		this.#hallCity = this.setOrFallback(properties.villesalle, '');
		this.#website = this.setOrFallback(properties.web, undefined);
		this.#contactLastname = this.setOrFallback(properties.nomcor, '');
		this.#contactFirstname = this.setOrFallback(properties.prenomcor, '');
		this.#contactMail = this.setOrFallback(properties.mailcor, undefined);
		this.#contactPhone = this.setOrFallback(properties.telcor, undefined);
		this.#latitude = this.setOrFallback(properties.latitude, undefined);
		this.#longitude = this.setOrFallback(properties.longitude, undefined);
		this.#validatedAt = this.setOrFallback(properties.validation, undefined, (value) => {
			const date = createDate(value, dateFormats.DATE);
			return date.isValid ? date : undefined;
		});
	}

	public get id() {
		return this.#id;
	}

	public get code() {
		return this.#code;
	}

	public get name() {
		return this.#name;
	}

	public get hallName() {
		return this.#hallName;
	}

	public get hallAddress1() {
		return this.#hallAddress1;
	}

	public get hallAddress2() {
		return this.#hallAddress2;
	}

	public get hallAddress3() {
		return this.#hallAddress3;
	}

	public get hallPostalCode() {
		return this.#hallPostalCode;
	}

	public get hallCity() {
		return this.#hallCity;
	}

	public get fullAddress() {
		let address = `${this.#hallName} - ${this.#hallAddress1}`;

		if (this.#hallAddress2) {
			address += `, ${this.#hallAddress2}`;
		}

		if (this.#hallAddress3) {
			address += `, ${this.#hallAddress3}`;
		}

		address += ` - ${this.hallPostalCode} ${this.hallCity}`;

		return address;
	}

	public get website() {
		return this.#website;
	}

	public get contactLastname() {
		return this.#contactLastname;
	}

	public get contactFirstname() {
		return this.#contactFirstname;
	}

	public get contactMail() {
		return this.#contactMail;
	}

	public get contactPhone() {
		return this.#contactPhone;
	}

	public get latitude() {
		return this.#latitude;
	}

	public get longitude() {
		return this.#longitude;
	}

	public get validatedAt() {
		return this.#validatedAt;
	}

	public serialize() {
		return {
			id: this.#id,
			code: this.#code,
			name: this.#name,
			hall: {
				name: this.#hallName,
				address1: this.#hallAddress1,
				address2: this.#hallAddress2,
				address3: this.#hallAddress3,
				postalCode: this.#hallPostalCode,
				city: this.#hallCity,
				fullAddress: this.fullAddress,
				latitude: this.#latitude,
				longitude: this.#longitude,
			},
			contact: {
				lastname: this.#contactLastname,
				firstname: this.#contactFirstname,
				mail: this.#contactMail,
				phone: this.#contactPhone?.toString(),
				website: this.#website,
			},
			validatedAt: stringifyDate(this.#validatedAt),
		};
	}
}
