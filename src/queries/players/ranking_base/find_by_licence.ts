import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingRankedPlayer } from '#src/models/player/ranked_player.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPlayerOnRankingBase extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(licence: string) {
		return this.callAPI({
			endpoint: ApiEndpoints.XML_JOUEUR,
			requestParameters: (search) => {
				search.set('licence', licence);
			},
			normalizationModel: SmartpingRankedPlayer,
			rootKey: 'joueur',
			cache: {
				key: `players:ranking:${licence}`,
				ttl: '1d',
			},
		}, true);
	}
}
