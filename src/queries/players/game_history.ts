import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingRankedGame, SmartpingSPIDGame } from '@/models/index.js';
import { mergeRankingAndSPIDGameHistoryCollection } from '@/helpers/collections.js';

export async function getPlayerGameHistoryOnRankingBase(licence: string) {
	return callAPI({
		endpoint: ApiEndpoints.XML_PARTIE_MYSQL,
		requestParameters: (search) => {
			search.set('licence', licence);
		},
		normalizationModel: SmartpingRankedGame,
		rootKey: 'partie',
		cache: {
			key: `player:rank:history:game:${licence}`,
			ttl: '1d',
		},
	});
}

export async function getPlayerGameHistoryOnSpidBase(licence: string) {
	return callAPI({
		endpoint: ApiEndpoints.XML_PARTIE,
		requestParameters: (search) => {
			search.set('licence', licence);
		},
		normalizationModel: SmartpingSPIDGame,
		rootKey: 'partie',
		cache: {
			key: `player:rank:history:spid:${licence}`,
			ttl: '1d',
		},
	});
}

export async function getPlayerGameHistory(licence: string) {
	const ranked = await getPlayerGameHistoryOnRankingBase(licence);
	const spid = await getPlayerGameHistoryOnSpidBase(licence);

	return mergeRankingAndSPIDGameHistoryCollection(ranked, spid);
}
