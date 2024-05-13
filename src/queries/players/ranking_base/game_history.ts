import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingRankedGame } from '#src/models/player/ranked_game.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPlayerGameHistoryOnRankingBase extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(licence: string) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_PARTIE_MYSQL,
			requestParameters: (search) => {
				search.set('licence', licence);
			},
			normalizationModel: SmartpingRankedGame,
			rootKey: 'partie',
			cache: {
				key: `player:rank:history:game:${licence}`,
				ttl: '1d',
			},
		});
	}
}
