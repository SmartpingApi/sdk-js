import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingClub } from '@/models/index.js';
import { generateSha } from '@/helpers/cache.js';

export async function findClubsByName(name: string) {
	const sha = generateSha(name);

	return callAPI({
		endpoint: ApiEndpoints.XML_CLUB_B,
		requestParameters: (search) => {
			search.set('ville', name);
		},
		normalizationModel: SmartpingClub,
		rootKey: 'club',
		cache: {
			key: `club:name:${sha}`,
			ttl: '1w'
		},
	});
}
