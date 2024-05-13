import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingSPIDLicensee } from '#src/models/player/spid_licensee.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPlayerOnSpidBase extends Query {
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
				endpoint: ApiEndpoints.XML_LICENCE,
				requestParameters: (search) => {
					search.set('licence', licence);
				},
				normalizationModel: SmartpingSPIDLicensee,
				rootKey: 'licence',
				cache: {
					key: `players:spid:${licence}`,
					ttl: '1d',
				},
			},
			true,
		);
	}
}
