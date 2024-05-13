import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingClub } from '#src/models/club/club.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindClubsByCity extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(city: string) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_CLUB_B,
			requestParameters: (search) => {
				search.set('ville', city);
			},
			normalizationModel: SmartpingClub,
			rootKey: 'club',
			cache: {
				key: `club:city:${encodeURIComponent(city)}`,
				ttl: '1w',
			},
		});
	}
}
