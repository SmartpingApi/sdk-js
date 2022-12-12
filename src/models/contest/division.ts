import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'

export interface DivisionConstructorProperties {
	iddivision: number;
	libelle: string;
}

export default class Division extends SmartpingObject {
	readonly #id: number;
	readonly #name: string;

	constructor (properties: DivisionConstructorProperties) {
		super();

		this.#id = isEmpty(properties.iddivision) ? 0 : properties.iddivision;
		this.#name = isEmpty(properties.libelle) ? '' : properties.libelle;
	}

	public id(): number {
		return this.#id;
	}

	public name(): string {
		return this.#name;
	}
}
