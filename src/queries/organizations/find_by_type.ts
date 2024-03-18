import type { ValueOf } from '@/types/index.js';
import type { OrganizationIdentifier } from '@/models/index.js';
import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingOrganization } from '@/models/index.js';
import { getOrganizationInCache } from '@/helpers/organizations.js';

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
