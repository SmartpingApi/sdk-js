import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingRankedPlayer } from '#src/models/player/ranked_player.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindPlayersByClubOnRankingBase extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(clubCode: string) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_LISTE_JOUEUR,
			requestParameters: (search) => {
				search.set('club', clubCode);
			},
			normalizationModel: SmartpingRankedPlayer,
			rootKey: 'joueur',
			cache: {
				key: `players:ranking:${clubCode}`,
				ttl: '1d',
			},
		});
	}
}
