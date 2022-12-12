import {
	getOrganizationInStore, getOrganizations,
	getOrganizationsSize, populateOrganizations,
} from './smartping-core'
import Organization from '../models/organization/organization'

export type OrganizationType = 'F'|'Z'|'L'|'D';

export default class OrganizationApi {
	public static async findOrganizationsByType(organizationType: OrganizationType): Promise<Organization[]> {
		if (getOrganizationsSize() === 0) {
			await populateOrganizations();
		}

		const results = getOrganizations().filter(org => org.type === organizationType);
		return results.map((org) => new Organization({
			id: org.id,
			code: org.code,
			libelle: org.name,
			idPere: org.parentId
		}));
	}

	public static async getOrganization(organizationId: number): Promise<Organization|undefined> {
		if (getOrganizationsSize() === 0) {
			await populateOrganizations();
		}

		return getOrganizationInStore(organizationId);
	}

	public static async getOrganizationChildren(organizationId: number): Promise<Organization[]> {
		if (getOrganizationsSize() === 0) {
			await populateOrganizations();
		}

		const results = getOrganizations().filter(org => Number(org.parentId) === organizationId);
		return results.map((org) => new Organization({
			id: org.id,
			code: org.code,
			libelle: org.name,
			idPere: org.parentId
		}));
	}
}
