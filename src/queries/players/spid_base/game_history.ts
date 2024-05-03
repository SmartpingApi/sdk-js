import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingSPIDGame } from '#src/models/player/spid_game.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPlayerGameHistoryOnSpidBase extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(licence: string) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_PARTIE,
			requestParameters: (search) => {
				search.set('licence', licence);
			},
			normalizationModel: SmartpingSPIDGame,
			rootKey: 'partie',
			cache: {
				key: `player:rank:history:spid:${licence}`,
				ttl: '1d',
			},
		});
	}
}
