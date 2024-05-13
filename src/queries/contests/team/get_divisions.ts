import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { CONTEST_TYPES } from '#src/models/contest/contest.js';
import { SmartpingTeamDivision } from '#src/models/contest/team/team_division.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindDivisionsForTeamContest extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(organizationId: number, contestId: number) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_DIVISION,
			requestParameters: (search) => {
				search.set('organisme', organizationId.toString());
				search.set('epreuve', contestId.toString());
				search.set('type', CONTEST_TYPES.team);
			},
			normalizationModel: SmartpingTeamDivision,
			rootKey: 'division',
			cache: {
				key: `contests:divisions:team:${organizationId}:${contestId}`,
				ttl: '1d',
			},
		});
	}
}
