import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingTeamPool } from '#src/models/contest/team/team_pool.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPoolsForDivision extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(divisionId: number) {
		return this.callAPI({
			endpoint: ApiEndpoints.XML_RESULT_EQU,
			requestParameters: (search) => {
				search.append('action', 'poule');
				search.append('auto', '1');
				search.append('D1', divisionId.toString());
			},
			normalizationModel: SmartpingTeamPool,
			rootKey: 'poule',
			cache: {
				key: `pools:${divisionId}`,
				ttl: '1d',
			},
		});
	}
}
