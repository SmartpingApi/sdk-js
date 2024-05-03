import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingTeamMatch } from '#src/models/contest/team/team_match.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetMatchesForPool extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(divisionId: number, poolId?: number) {
		return this.callAPI({
			endpoint: ApiEndpoints.XML_RESULT_EQU,
			requestParameters: (search) => {
				search.append('action', '');
				search.append('auto', '1');
				search.append('D1', divisionId.toString());
				search.append('cx_poule', poolId?.toString() ?? '');
			},
			normalizationModel: SmartpingTeamMatch,
			rootKey: 'tour',
			cache: {
				key: `pool:matches:${divisionId}${poolId ?? ''}`,
				ttl: '1d',
			},
		});
	}
}
