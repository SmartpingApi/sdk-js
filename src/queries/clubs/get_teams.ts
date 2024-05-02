import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import { SmartpingClubTeam } from '#src/models/club/club_team';
import type { ValueOf } from '#src/types/index';

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
