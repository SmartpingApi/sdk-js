import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingClubDetail } from '#src/models/club/club_detail.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindClubByCode extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(code: string) {
		return this.callAPI({
			endpoint: ApiEndpoints.XML_CLUB_DETAIL,
			requestParameters: (search) => {
				search.append('club', code);
			},
			normalizationModel: SmartpingClubDetail,
			rootKey: 'club',
			cache: {
				key: `club:detail:${code}`,
				ttl: '1w',
			},
		}, true);
	}
}
