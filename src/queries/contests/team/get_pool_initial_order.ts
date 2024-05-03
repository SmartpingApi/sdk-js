import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingTeamPoolTeam } from '#src/models/contest/team/team_pool_team.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPoolInitialOrder extends Query {
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
				search.append('action', 'initial');
				search.append('auto', '1');
				search.append('D1', divisionId.toString());

				if (poolId) {
					search.append('cx_poule', poolId?.toString() ?? '');
				}
			},
			normalizationModel: SmartpingTeamPoolTeam,
			rootKey: 'classement',
			cache: {
				key: `pool:initial:${divisionId}${poolId ?? ''}`,
				ttl: '1d',
			},
		});
	}
}
