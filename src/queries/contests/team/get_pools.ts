import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import { SmartpingTeamPool } from '#src/models/contest/team/team_pool';

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
