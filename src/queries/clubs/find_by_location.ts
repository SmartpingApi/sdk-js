import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingClub } from '@/models/index.js';
import { generateSha } from '@/helpers/cache.js';

export async function findClubsByDepartment(department: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_CLUB_B,
		requestParameters: (search) => {
			search.set('dep', department.toString());
		},
		normalizationModel: SmartpingClub,
		rootKey: 'club',
		cache: {
			key: `club:dept:${department}`,
			ttl: '1w',
		},
	});
}

export async function findClubsByPostalCode(postalCode: string) {
	return callAPI({
		endpoint: ApiEndpoints.XML_CLUB_B,
		requestParameters: (search) => {
			search.set('code', postalCode);
		},
		normalizationModel: SmartpingClub,
		rootKey: 'club',
		cache: {
			key: `club:postalCode:${postalCode}`,
			ttl: '1w',
		},
	});
}

export async function findClubsByCity(city: string) {
	const sha = generateSha(city);

	return callAPI({
		endpoint: ApiEndpoints.XML_CLUB_B,
		requestParameters: (search) => {
			search.set('ville', city);
		},
		normalizationModel: SmartpingClub,
		rootKey: 'club',
		cache: {
			key: `club:city:${sha}`,
			ttl: '1w',
		},
	});
}
