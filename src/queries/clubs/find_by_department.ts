import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingClub } from '#src/models/club/club.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindClubsByDepartment extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(department: string) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_CLUB_DEP_2,
			requestParameters: (search) => {
				search.set('dep', department.toString());
			},
			normalizationModel: SmartpingClub,
			rootKey: 'club',
			cache: {
				key: `club:dept:${department}`,
				ttl: '1w',
			},
		});
	}
}
