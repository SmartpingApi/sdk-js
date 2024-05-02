import { ApiEndpoints } from '#src/api_endpoints';
import { generateSha } from '#src/helpers/cache';
import { mergeRankedAndSPIDPlayerCollection } from '#src/helpers/collections';
import { callAPI } from '#src/helpers/request';
import { booleanToNumber } from '#src/helpers/utils';
import { SmartpingRankedPlayer } from '#src/models/player/ranked_player';
import { SmartpingSPIDPlayer } from '#src/models/player/spid_player';

export async function findPlayersByNameOnRankingBase(lastname: string, firstname?: string) {
	const sha = generateSha(`${lastname}${firstname ?? ''}`);

	return callAPI({
		endpoint: ApiEndpoints.XML_LISTE_JOUEUR,
		normalizationModel: SmartpingRankedPlayer,
		rootKey: 'joueur',
		requestParameters: (search) => {
			search.set('nom', lastname);
			if (firstname) {
				search.set('prenom', firstname);
			}
		},
		cache: {
			key: `players:rank:name:${sha}`,
			ttl: '1d',
		},
	});
}

export async function findPlayersByNameOnSpidBase(lastname: string, firstname?: string, valid = false) {
	const sha = generateSha(`${lastname}${firstname ?? ''}`);

	return callAPI({
		endpoint: ApiEndpoints.XML_LISTE_JOUEUR_O,
		requestParameters: (search) => {
			search.set('valid', valid ? '1' : '0');
			search.set('nom', lastname);
			if (firstname) {
				search.set('prenom', firstname);
			}
		},
		normalizationModel: SmartpingSPIDPlayer,
		rootKey: 'joueur',
		cache: {
			key: `players:spid:name:${sha}:${booleanToNumber(valid)}`,
			ttl: '1d',
		},
	});
}

export async function findPlayersByName(lastname: string, firstname?: string, valid = false) {
	const rankedResponse = await findPlayersByNameOnRankingBase(lastname, firstname);
	const spidResponse = await findPlayersByNameOnSpidBase(lastname, firstname, valid);

	return mergeRankedAndSPIDPlayerCollection(rankedResponse, spidResponse);
}
