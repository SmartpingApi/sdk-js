import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingNews } from '@/models/index.js';

export async function getFederationNewsFeed() {
	return callAPI({
		endpoint: ApiEndpoints.XML_NEW_ACTU,
		normalizationModel: SmartpingNews,
		rootKey: 'news',
		cache: {
			key: 'news',
			ttl: '1w',
		},
	});
}
