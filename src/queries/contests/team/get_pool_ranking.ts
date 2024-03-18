import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingTeamPoolTeam } from '@/models/index.js';

export async function getPoolRanking(divisionId: number, poolId?: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_RESULT_EQU,
		requestParameters: (search) => {
			search.append('action', 'classement');
			search.append('auto', '1');
			search.append('D1', divisionId.toString());

			if (poolId) {
				search.append('cx_poule', poolId?.toString() ?? '');
			}
		},
		normalizationModel: SmartpingTeamPoolTeam,
		rootKey: 'classement',
		cache: {
			key: `pool:ranking:${divisionId}${poolId ?? '' }`,
			ttl: '1d',
		},
	});
}
