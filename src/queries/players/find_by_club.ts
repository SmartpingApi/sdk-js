import { ApiEndpoints } from '#src/api_endpoints';
import { mergeRankedAndSPIDPlayerCollection } from '#src/helpers/collections';
import { callAPI } from '#src/helpers/request';
import { booleanToNumber } from '#src/helpers/utils';
import { SmartpingRankedPlayer } from '#src/models/player/ranked_player';
import { SmartpingSPIDPlayer } from '#src/models/player/spid_player';

export async function findPlayersByClubOnRankingBase(clubCode: string) {
	return callAPI({
		endpoint: ApiEndpoints.XML_LISTE_JOUEUR,
		requestParameters: (search) => {
			search.set('club', clubCode);
		},
		normalizationModel: SmartpingRankedPlayer,
		rootKey: 'joueur',
		cache: {
			key: `players:ranking:${clubCode}`,
			ttl: '1d',
		},
	});
}

export async function findPlayersByClubOnSpidBase(clubCode: string, valid = false) {
	return callAPI({
		endpoint: ApiEndpoints.XML_LISTE_JOUEUR_O,
		requestParameters: (search) => {
			search.set('club', clubCode);
			search.set('valid', valid ? '1' : '0');
		},
		normalizationModel: SmartpingSPIDPlayer,
		rootKey: 'joueur',
		cache: {
			key: `players:spid:${clubCode}:${booleanToNumber(valid)}`,
			ttl: '1d',
		},
	});
}

export async function findPlayersByClub(clubCode: string, valid = false) {
	const rankedResponse = await findPlayersByClubOnRankingBase(clubCode);
	const spidResponse = await findPlayersByClubOnSpidBase(clubCode, valid);

	return mergeRankedAndSPIDPlayerCollection(rankedResponse, spidResponse);
}
