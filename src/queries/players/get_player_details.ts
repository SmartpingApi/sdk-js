import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingPlayerDetails } from '#src/models/player/player_details.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPlayerDetails extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(licence: string) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_LICENCE_B,
			requestParameters: (search) => {
				search.set('licence', licence);
			},
			normalizationModel: SmartpingPlayerDetails,
			rootKey: 'licence',
			cache: {
				key: `players:details:${licence}`,
				ttl: '1d',
			},
		});
	}
}
