import { ApiEndpoints } from '#src/api_endpoints';
import { generateSha } from '#src/helpers/cache';
import { callAPI } from '#src/helpers/request';
import { SmartpingClub } from '#src/models/club/club';

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
