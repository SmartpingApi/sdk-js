import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingClubDetail } from '@/models/index.js';

export async function getClub(code: string) {
	return callAPI({
		endpoint: ApiEndpoints.XML_CLUB_DETAIL,
		requestParameters: (search) => {
			search.append('club', code);
		},
		normalizationModel: SmartpingClubDetail,
		rootKey: 'club',
		cache: {
			key: `club:detail:${code}`,
			ttl: '1w',
		},
	}, true);
}
