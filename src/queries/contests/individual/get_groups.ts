import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import { SmartpingIndividualContestGroup } from '#src/models/contest/individual/individual_contest_group';

export async function getIndividualContestGroup(contestId: number, divisionId: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_RESULT_INDIV,
		requestParameters: (search) => {
			search.append('action', 'poule');
			search.append('epr', contestId.toString());
			search.append('res_division', divisionId.toString());
		},
		normalizationModel: SmartpingIndividualContestGroup,
		rootKey: 'tour',
		cache: {
			key: `contests:indiv:groups:${contestId}:${divisionId}`,
			ttl: '1d',
		},
	});
}
