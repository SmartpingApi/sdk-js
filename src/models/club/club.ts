import { SmartpingObject } from '../smartping-object'
import { createDate } from '../../helpers/datetime-helpers'
import { isEmpty, stringifyDate } from '../../helpers/validation'

export interface ClubConstructorProperties {
	idclub: number;
	numero: string;
	nom: string;
	validation: string;
	typeclub: string;
}

interface ClubExportProperties {
	id: number
	code: string
	name: string
	validatedAt?: string
	type: string
}

export default class Club extends SmartpingObject {
	readonly #id: number

	readonly #code: string;

	readonly #name: string;

	readonly #validatedAt?: Date;

	readonly #type: string;

	constructor (properties: ClubConstructorProperties) {
		super();

		this.#id = isEmpty(properties.idclub) ? 0 : Number(properties.idclub);
		this.#code = isEmpty(properties.numero) ? '' : properties.numero;
		this.#name = isEmpty(properties.nom) ? '' : properties.nom;
		this.#validatedAt = isEmpty(properties.validation) ? undefined : createDate(properties.validation, 'DD/MM/YYYY');
		this.#type = isEmpty(properties.typeclub) ? '' : properties.typeclub;
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

	public validatedAt(): Date|undefined {
		return this.#validatedAt;
	}

	public type(): string {
		return this.#type;
	}

	public normalize(): ClubExportProperties {
		return {
			id: this.#id,
			code: this.#code,
			name: this.#name,
			type: this.#type,
			validatedAt: stringifyDate(this.#validatedAt),
		};
	}
}
