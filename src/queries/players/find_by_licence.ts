import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingPlayerDetails, SmartpingRankedPlayer, SmartpingSPIDPlayer } from '@/models/index.js';

export async function getPlayerOnRankingBase(licence: string) {
	return callAPI({
		endpoint: ApiEndpoints.XML_JOUEUR,
		requestParameters: (search) => {
			search.set('licence', licence);
		},
		normalizationModel: SmartpingRankedPlayer,
		rootKey: 'joueur',
		cache: {
			key: `players:ranking:${licence}`,
			ttl: '1d',
		},
	});
}

export async function getPlayerOnSpidBase(licence: string) {
	return callAPI({
		endpoint: ApiEndpoints.XML_LICENCE,
		requestParameters: (search) => {
			search.set('licence', licence);
		},
		normalizationModel: SmartpingSPIDPlayer,
		rootKey: 'licence',
		cache: {
			key: `players:spid:${licence}`,
			ttl: '1d',
		},
	});
}

export async function getPlayerDetails(licence: string) {
	return await callAPI({
		endpoint: ApiEndpoints.XML_LICENCE_B,
		requestParameters: (search) => {
			search.set('licence', licence);
		},
		normalizationModel: SmartpingPlayerDetails,
		rootKey: 'licence',
		cache: {
			key: `players:details:${licence}`,
			ttl: '1d',
		},
	});
}
