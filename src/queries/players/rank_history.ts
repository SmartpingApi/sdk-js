import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingPlayerRankHistory } from '@/models/index.js';

export async function getPlayerRankHistory(licence: string) {
	return callAPI({
		endpoint: ApiEndpoints.XML_HISTO_CLASSEMENT,
		requestParameters: (search) => {
			search.set('numlic', licence);
		},
		normalizationModel: SmartpingPlayerRankHistory,
		rootKey: 'histo',
		cache: {
			key: `player:history:rank:${licence}`,
			ttl: '1m',
		},
	});
}
