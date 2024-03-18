import type { ValueOf } from '@/types/index.js';
import type { ContestType } from '@/models/index.js';
import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingContest } from '@/models/index.js';

export async function findContests(organizationId: number, contestType: ValueOf<ContestType>) {
	return callAPI({
		endpoint: ApiEndpoints.XML_EPREUVE,
		requestParameters: (search) => {
			search.set('organisme', organizationId.toString());
			search.set('type', contestType);
		},
		normalizationModel: SmartpingContest,
		rootKey: 'epreuve',
		cache: {
			key: `contests:${organizationId}:${contestType}`,
			ttl: '1d',
		},
	});
}
