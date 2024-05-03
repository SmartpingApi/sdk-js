import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingFederalCriteriumRank } from '#src/models/contest/individual/federal_criterium_rank.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetFederalCriteriumRankForDivision extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(divisionId: number) {
		return this.callAPI({
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
}
