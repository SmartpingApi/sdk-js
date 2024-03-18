import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingTeamMatch } from '@/models/index.js';

export async function getMatchesForPool(divisionId: number, poolId?: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_RESULT_EQU,
		requestParameters: (search) => {
			search.append('action', '');
			search.append('auto', '1');
			search.append('D1', divisionId.toString());
			search.append('cx_poule', poolId?.toString() ?? '');
		},
		normalizationModel: SmartpingTeamMatch,
		rootKey: 'tour',
		cache: {
			key: `pool:matches:${divisionId}${poolId ?? '' }`,
			ttl: '1d',
		},
	});
}
