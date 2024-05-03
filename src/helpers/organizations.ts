import type { OrganizationIdentifier } from '#src/models/organization/organization.js';
import { SmartpingOrganization } from '#src/models/organization/organization.js';
import {
	FindOrganizationsByType,
	type OrganizationType,
	OrganizationTypes,
} from '#src/queries/organizations/find_by_type.js';
import type { SmartpingContext } from '#src/smartping.js';

const organizationsStore = new Map<OrganizationIdentifier, SmartpingOrganization>();

async function populateOrganizationType(type: OrganizationType, context: SmartpingContext) {
	const list = await FindOrganizationsByType.create(context).run(type);

	for (const organization of list) {
		organizationsStore.set(organization.code, organization);
	}
}

async function fetchAllOrganizations(context: SmartpingContext) {
	const types = Object.keys(OrganizationTypes) as Array<OrganizationType>;
	const requests = types.map((type) => populateOrganizationType(type, context));

	await Promise.all(requests);
}

export async function getOrganizationInCache(
	identifier: OrganizationIdentifier,
	context: SmartpingContext,
) {
	if (organizationsStore.size === 0) {
		await fetchAllOrganizations(context);
	}

	return organizationsStore.get(identifier);
}
