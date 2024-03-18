import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingFederalCriteriumRank } from '@/models/index.js';

export async function getFederalCriteriumRankForDivision(divisionId: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_RES_CLA,
		requestParameters: (search) => {
			search.set('res_division', divisionId.toString());
		},
		normalizationModel: SmartpingFederalCriteriumRank,
		rootKey: 'classement',
		cache: {
			key: `criterium:rank:${divisionId}`,
			ttl: '1d',
		},
	});
}
