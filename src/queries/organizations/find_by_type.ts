import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingOrganization } from '#src/models/organization/organization.js';
import type { SmartpingContext } from '#src/smartping.js';

export const OrganizationTypes = {
	federation: 'F',
	zone: 'Z',
	league: 'L',
	department: 'D',
} as const;

export type OrganizationType = keyof typeof OrganizationTypes;

export class FindOrganizationsByType extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(organizationType: OrganizationType) {
		return this.callAPI({
			endpoint: ApiEndpoints.XML_ORGANISME,
			requestParameters: (search) => {
				search.set('type', OrganizationTypes[organizationType]);
			},
			normalizationModel: SmartpingOrganization,
			rootKey: 'organisme',
			cache: {
				key: `org:${OrganizationTypes[organizationType]}`,
				ttl: '3m',
			},
		});
	}
}
