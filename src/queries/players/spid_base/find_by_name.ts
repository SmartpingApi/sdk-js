import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { booleanToNumber } from '#src/helpers/utils.js';
import { SmartpingSPIDPlayer } from '#src/models/player/spid_player.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindPlayersByNameOnSpidBase extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(lastname: string, firstname?: string, valid = false) {
		const cacheId = encodeURIComponent(`${lastname}${firstname ?? ''}`);

		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_LISTE_JOUEUR_O,
			requestParameters: (search) => {
				search.set('valid', valid ? '1' : '0');
				search.set('nom', lastname);
				if (firstname) {
					search.set('prenom', firstname);
				}
			},
			normalizationModel: SmartpingSPIDPlayer,
			rootKey: 'joueur',
			cache: {
				key: `players:spid:name:${cacheId}:${booleanToNumber(valid)}`,
				ttl: '1d',
			},
		});
	}
}
