import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import { SmartpingPlayerRankHistory } from '#src/models/player/player_rank_history';

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
