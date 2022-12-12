import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'
import OrganizationApi from '../../services/organization-api'

export interface OrganizationConstructorProperties {
	id: number;
	libelle: string;
	code: string;
	idPere: string;
}

export interface OrganizationExportProperties {
	id: number;
	name: string;
	code: string;
	parentId: string;
	type: string;
}

export default class Organization extends SmartpingObject {
	readonly #id: number;
	readonly #name: string;
	readonly #code: string;
	readonly #parentId?: number;
	readonly #type: string;

	constructor (properties: OrganizationConstructorProperties) {
		super();

		this.#id = isEmpty(properties.id) ? 0 : Number(properties.id);
		this.#name = isEmpty(properties.libelle) ? '' : properties.libelle;
		this.#code = isEmpty(properties.code) ? '' : properties.code;
		this.#parentId = isEmpty(properties.idPere) ? undefined : Number(properties.idPere);
		this.#type = isEmpty(properties.code) ? '' : this.#code.slice(0, 1);
	}

	public id(): number {
		return this.#id;
	}

	public name(): string {
		return this.#name;
	}

	public code(): string {
		return this.#code;
	}

	public parentId(): number|undefined {
		return this.#parentId;
	}

	public type(): string {
		return this.#type;
	}

	public async parentInstance(): Promise<Organization|undefined> {
		if (!this.#parentId) {
			// eslint-disable-next-line unicorn/no-useless-undefined
			return new Promise(resolve => resolve(undefined));
		}

		return OrganizationApi.getOrganization(this.#parentId);
	}

	public async children(): Promise<Organization[]|undefined> {
		return OrganizationApi.getOrganizationChildren(this.#id);
	}

	public normalize(): OrganizationExportProperties {
		return {
			id: this.#id,
			name: this.#name,
			code: this.#code,
			parentId: this.#parentId ? String(this.#parentId) : '',
			type: this.#type,
		}
	}
}
