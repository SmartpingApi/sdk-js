import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingPlayerRankHistory } from '#src/models/player/player_rank_history.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPlayerRankHistory extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(licence: string) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_HISTO_CLASSEMENT,
			requestParameters: (search) => {
				search.set('numlic', licence);
			},
			normalizationModel: SmartpingPlayerRankHistory,
			rootKey: 'histo',
			cache: {
				key: `player:history:rank:${licence}`,
				ttl: '1m',
			},
		});
	}
}
