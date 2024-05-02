import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import { SmartpingFederalCriteriumRank } from '#src/models/contest/individual/federal_criterium_rank';

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
