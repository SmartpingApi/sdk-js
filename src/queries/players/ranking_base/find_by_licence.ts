import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingRankedLicensee } from '#src/models/player/ranked_licensee.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPlayerOnRankingBase extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(licence: string) {
		return this.callAPI(
			{
				context: this.context,
				endpoint: ApiEndpoints.XML_JOUEUR,
				requestParameters: (search) => {
					search.set('licence', licence);
				},
				normalizationModel: SmartpingRankedLicensee,
				rootKey: 'joueur',
				cache: {
					key: `players:ranking:${licence}`,
					ttl: '1d',
				},
			},
			true,
		);
	}
}
