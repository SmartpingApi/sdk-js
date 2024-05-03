import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { CONTEST_TYPES, type ContestType, SmartpingContest } from '#src/models/contest/contest.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindContests extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(organizationId: number, contestType: ContestType) {
		return this.callAPI({
			endpoint: ApiEndpoints.XML_EPREUVE,
			requestParameters: (search) => {
				search.set('organisme', organizationId.toString());
				search.set('type', CONTEST_TYPES[contestType]);
			},
			normalizationModel: SmartpingContest,
			rootKey: 'epreuve',
			cache: {
				key: `contests:${organizationId}:${CONTEST_TYPES[contestType]}`,
				ttl: '1d',
			},
		});
	}
}
