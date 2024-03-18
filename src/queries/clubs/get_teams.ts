import type { ValueOf } from '@/types/index.js';
import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingClubTeam } from '@/models/index.js';

export const TeamTypes = {
	Men: 'M',
	Women: 'F',
	All: 'A',
	None: ''
} as const;

export async function getTeamsForClub(clubCode: string, teamType: ValueOf<typeof TeamTypes>) {
	return callAPI({
		endpoint: ApiEndpoints.XML_EQUIPE,
		requestParameters: (search) => {
			search.set('numclu', clubCode);
			search.set('type', teamType);
		},
		normalizationModel: SmartpingClubTeam,
		rootKey: 'equipe',
		cache: {
			key: `teams:${clubCode}:${teamType}`,
			ttl: '1w'
		},
	});
}
