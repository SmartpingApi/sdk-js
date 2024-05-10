import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingNews } from '#src/models/common/news.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetFederationNewsFeed extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run() {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_NEW_ACTU,
			normalizationModel: SmartpingNews,
			rootKey: 'news',
			cache: {
				key: 'news',
				ttl: '1w',
			},
			charset: 'utf8',
		});
	}
}
