import { getOrganizationInCache } from '#src/helpers/organizations.js';
import type { QueryOptions } from '#src/helpers/query.js';
import type { OrganizationIdentifier } from '#src/models/organization/organization.js';
import { FindOrganizationsByType, type OrganizationType } from '#src/queries/organizations/find_by_type.js';
import type { SmartpingContext } from '#src/smartping.js';

export default class OrganizationQueries {
	#context: SmartpingContext;

	constructor(context: SmartpingContext) {
		this.#context = context;
	}

	getOrganization(identifier: OrganizationIdentifier) {
		return getOrganizationInCache(identifier);
	}

	findByType(organizationType: OrganizationType, options?: QueryOptions) {
		return FindOrganizationsByType.create(this.#context).withOptions(options).run(organizationType);
	}
}
