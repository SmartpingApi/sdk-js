import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingInitialization } from '#src/models/common/initialization.js';
import type { SmartpingContext } from '#src/smartping.js';

export class Authenticate extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run() {
		return this.callAPI(
			{
				context: this.context,
				endpoint: ApiEndpoints.XML_INITIALISATION,
				normalizationModel: SmartpingInitialization,
				rootKey: 'initialisation',
				cache: false,
			},
			true,
		);
	}
}
