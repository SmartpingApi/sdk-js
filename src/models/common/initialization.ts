import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'

export interface InitializationConstructorProperties {
	appli: number;
}

export default class Initialization extends SmartpingObject {
	readonly #authorized: boolean;

	constructor (properties: InitializationConstructorProperties) {
		super();

		this.#authorized = isEmpty(properties.appli) ? false : Boolean(properties.appli);
	}

	public authorized(): boolean {
		return this.#authorized;
	}
}
