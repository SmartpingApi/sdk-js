import { getOrganization, findOrganizationsByType } from './find_by_type.js';

export default {
	get: getOrganization,
	findByType: findOrganizationsByType,
}

export type { OrganizationIdentifier } from '@/models/index.js';
