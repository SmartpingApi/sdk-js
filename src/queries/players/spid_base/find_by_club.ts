import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { booleanToNumber } from '#src/helpers/utils.js';
import { SmartpingSPIDPlayer } from '#src/models/player/spid_player.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindPlayersByClubOnSpidBase extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(clubCode: string, valid = false) {
		return this.callAPI({
			endpoint: ApiEndpoints.XML_LISTE_JOUEUR_O,
			requestParameters: (search) => {
				search.set('club', clubCode);
				search.set('valid', valid ? '1' : '0');
			},
			normalizationModel: SmartpingSPIDPlayer,
			rootKey: 'joueur',
			cache: {
				key: `players:spid:${clubCode}:${booleanToNumber(valid)}`,
				ttl: '1d',
			},
		});
	}
}
