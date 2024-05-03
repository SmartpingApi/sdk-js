import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingRankedPlayer } from '#src/models/player/ranked_player.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindPlayersByNameOnRankingBase extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(lastname: string, firstname?: string) {
		const cacheId = encodeURIComponent(`${lastname}${firstname ?? ''}`);

		return this.callAPI({
			endpoint: ApiEndpoints.XML_LISTE_JOUEUR,
			normalizationModel: SmartpingRankedPlayer,
			rootKey: 'joueur',
			requestParameters: (search) => {
				search.set('nom', lastname);
				if (firstname) {
					search.set('prenom', firstname);
				}
			},
			cache: {
				key: `players:rank:name:${cacheId}`,
				ttl: '1d',
			},
		});
	}
}
