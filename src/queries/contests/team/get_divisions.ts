import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { CONTEST_TYPES, type ContestType } from '#src/models/contest/contest.js';
import { SmartpingDivision } from '#src/models/contest/division.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindDivisionsForContest extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(organizationId: number, contestId: number, contestType: ContestType) {
		return this.callAPI({
			endpoint: ApiEndpoints.XML_DIVISION,
			requestParameters: (search) => {
				search.set('organisme', organizationId.toString());
				search.set('epreuve', contestId.toString());
				search.set('type', CONTEST_TYPES[contestType]);
			},
			normalizationModel: SmartpingDivision,
			rootKey: 'division',
			cache: {
				key: `contests:divisions:${organizationId}:${contestId}`,
				ttl: '1d',
			},
		});
	}
}
