import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingIndividualContestRank } from '#src/models/contest/individual/individual_contest_rank.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetIndividualContestRank extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(contestId: number, divisionId: number, groupId?: number) {
		return this.callAPI({
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
				key: `contests:indiv:rank:${contestId}:${divisionId}${groupId ?? ''}`,
				ttl: '1d',
			},
		});
	}
}
