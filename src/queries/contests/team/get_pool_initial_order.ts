import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import { SmartpingTeamPoolTeam } from '#src/models/contest/team/team_pool_team';

export async function getPoolInitialOrder(divisionId: number, poolId?: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_RESULT_EQU,
		requestParameters: (search) => {
			search.append('action', 'initial');
			search.append('auto', '1');
			search.append('D1', divisionId.toString());

			if (poolId) {
				search.append('cx_poule', poolId?.toString() ?? '');
			}
		},
		normalizationModel: SmartpingTeamPoolTeam,
		rootKey: 'classement',
		cache: {
			key: `pool:initial:${divisionId}${poolId ?? '' }`,
			ttl: '1d',
		},
	});
}
