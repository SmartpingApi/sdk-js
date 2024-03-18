import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingRankedPlayer, SmartpingSPIDPlayer } from '@/models/index.js';
import { mergeRankedAndSPIDPlayerCollection } from '@/helpers/collections.js';
import { generateSha } from '@/helpers/cache.js';
import { booleanToNumber } from '@/helpers/utils.js';

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
