import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingTeamPool } from '@/models/index.js';

export async function getPoolsForDivision(divisionId: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_RESULT_EQU,
		requestParameters: (search) => {
			search.append('action', 'poule');
			search.append('auto', '1');
			search.append('D1', divisionId.toString());
		},
		normalizationModel: SmartpingTeamPool,
		rootKey: 'poule',
		cache: {
			key: `pools:${divisionId}`,
			ttl: '1d',
		},
	});
}
