import { ApiEndpoints } from '#src/api_endpoints';
import { getOrganizationInCache } from '#src/helpers/organizations';
import { callAPI } from '#src/helpers/request';
import type { OrganizationIdentifier } from '#src/models/organization/organization';
import { SmartpingOrganization } from '#src/models/organization/organization';
import type { ValueOf } from '#src/types/index';

export const OrganizationTypes = {
	Federation: 'F',
	Zone: 'Z',
	League: 'L',
	Department: 'D',
} as const;

export async function findOrganizationsByType(organizationType: ValueOf<typeof OrganizationTypes>) {
	return callAPI({
		endpoint: ApiEndpoints.XML_ORGANISME,
		requestParameters: (search) => {
			search.set('type', organizationType);
		},
		normalizationModel: SmartpingOrganization,
		rootKey: 'organisme',
		cache: {
			key: `org:${organizationType}`,
			ttl: '3m',
		},
	});
}

export async function getOrganization(identifier: OrganizationIdentifier) {
	return getOrganizationInCache(identifier);
}
