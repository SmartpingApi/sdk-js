import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingIndividualContestGroup } from '#src/models/contest/individual/individual_contest_group.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetIndividualContestGroups extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(contestId: number, divisionId: number) {
		return this.callAPI({
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
}
