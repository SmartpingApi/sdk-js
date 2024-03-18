import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingIndividualContestRank } from '@/models/index.js';

export async function getIndividualContestRank(contestId: number, divisionId: number, groupId?: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_RESULT_INDIV,
		requestParameters: (search) => {
			search.set('action', 'classement');
			search.set('epr', contestId.toString());
			search.set('res_division', divisionId.toString());
			search.set('cx_tableau', groupId?.toString() ?? '');
		},
		normalizationModel: SmartpingIndividualContestRank,
		rootKey: 'classement',
		cache: {
			key: `contests:indiv:rank:${contestId}:${divisionId}${groupId ?? '' }`,
			ttl: '1d',
		},
	});
}
