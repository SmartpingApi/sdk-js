import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import { SmartpingIndividualContestGame } from '#src/models/contest/individual/individual_contest_game';

export async function getIndividualContestGames(contestId: number, divisionId: number, groupId?: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_RESULT_INDIV,
		requestParameters: (search) => {
			search.set('action', 'partie');
			search.set('epr', contestId.toString());
			search.set('res_division', divisionId.toString());
			search.set('cx_tableau', groupId?.toString() ?? '');
		},
		normalizationModel: SmartpingIndividualContestGame,
		rootKey: 'partie',
		cache: {
			key: `contests:indiv:games:${contestId}:${divisionId}${groupId ?? '' }`,
			ttl: '1d',
		},
	});
}
