import { SmartpingObject } from '../smartping-object'
import { isEmpty } from '../../helpers/validation'
import ContestApi, { ContestType } from '../../services/contest-api'
import Division from './division'
import OrganizationApi from '../../services/organization-api'

export interface ContestConstructorProperties {
	idepreuve: number;
	idorga: number;
	libelle: string;
	typepreuve: string;
}

export default class Contest extends SmartpingObject {
	readonly #id: number;
	readonly #organizerId: number;
	readonly #name: string;
	readonly #type: string;

	constructor (properties: ContestConstructorProperties) {
		super();

		this.#id = isEmpty(properties.idepreuve) ? 0 : properties.idepreuve;
		this.#organizerId = isEmpty(properties.idorga) ? 0 : properties.idorga;
		this.#name = isEmpty(properties.libelle) ? '' : properties.libelle;
		this.#type = isEmpty(properties.typepreuve) ? '' : properties.typepreuve;
	}

	public id(): number {
		return this.#id;
	}

	public organizerId(): number {
		return this.#organizerId;
	}

	public name(): string {
		return this.#name;
	}

	public type(): string {
		return this.#type;
	}

	public async divisions(): Promise<Division[]> {
		let type: ContestType;

		switch(this.#type) {
			case 'I':
			case 'C':
				type = 'I';
				break;
			default:
				type = 'E';
		}

		const organization = await OrganizationApi.getOrganization(this.#organizerId);

		if (!organization) {
			return [];
		}

		const search = await ContestApi.findDivisionsForContest(organization.id(), this.#id, type);

		if (search.length > 0) {
			return search;
		}

		const parentOrganization = await organization.parentInstance();

		if (parentOrganization) {
			const search = await ContestApi.findDivisionsForContest(parentOrganization.id(), this.#id, type);

			if (search.length > 0) {
				return search;
			}
		}

		return [];
	}
}
