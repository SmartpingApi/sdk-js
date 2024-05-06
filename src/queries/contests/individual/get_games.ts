import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingIndividualContestGame } from '#src/models/contest/individual/individual_contest_game.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetIndividualContestGames extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(contestId: number, divisionId: number, groupId?: number) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_RESULT_INDIV,
			requestParameters: (search) => {
				search.set('action', 'partie');
				search.set('epr', contestId.toString());
				search.set('res_division', divisionId.toString());
				search.set('cx_tableau', groupId?.toString() ?? '');
			},
			normalizationModel: SmartpingIndividualContestGame,
			rootKey: 'partie',
			cache: {
				key: `contests:indiv:games:${contestId}:${divisionId}${groupId ?? ''}`,
				ttl: '1d',
			},
		});
	}
}
