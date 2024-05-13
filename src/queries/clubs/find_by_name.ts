import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingClub } from '#src/models/club/club.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindClubsByName extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(name: string) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_CLUB_B,
			requestParameters: (search) => {
				search.set('ville', name);
			},
			normalizationModel: SmartpingClub,
			rootKey: 'club',
			cache: {
				key: `club:name:${encodeURIComponent(name)}`,
				ttl: '1w',
			},
		});
	}
}
