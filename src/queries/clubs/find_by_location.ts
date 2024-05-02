import { ApiEndpoints } from '#src/api_endpoints';
import { generateSha } from '#src/helpers/cache';
import { callAPI } from '#src/helpers/request';
import { SmartpingClub } from '#src/models/club/club';

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
