import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import { SmartpingNews } from '#src/models/common/news';

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
