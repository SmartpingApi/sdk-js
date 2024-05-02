import { ApiEndpoints } from '#src/api_endpoints';
import { mergeRankingAndSPIDGameHistoryCollection } from '#src/helpers/collections';
import { callAPI } from '#src/helpers/request';
import { SmartpingRankedGame } from '#src/models/player/ranked_game';
import { SmartpingSPIDGame } from '#src/models/player/spid_game';

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
