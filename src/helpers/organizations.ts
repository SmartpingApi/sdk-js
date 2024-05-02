import type { OrganizationIdentifier } from '#src/models/organization/organization.js';
import { SmartpingOrganization } from '#src/models/organization/organization.js';
import { findOrganizationsByType, OrganizationTypes } from '#src/queries/organizations/find_by_type.js';
import type { ValueOf } from '#src/types/index.js';

const organizationsStore = new Map<OrganizationIdentifier, SmartpingOrganization>();

async function populateOrganizationType(type: ValueOf<typeof OrganizationTypes>) {
	const list = await findOrganizationsByType(type);

	for (const organization of list) {
		organizationsStore.set(organization.code, organization);
	}
}

async function fetchAllOrganizations() {
	const types = Object.keys(OrganizationTypes) as (ValueOf<typeof OrganizationTypes>)[];
	const requests = types.map((type) => populateOrganizationType(type));

	await Promise.all(requests);
}

export async function getOrganizationInCache(identifier: OrganizationIdentifier) {
	if (organizationsStore.size === 0) {
		await fetchAllOrganizations();
	}

	return organizationsStore.get(identifier);
}
