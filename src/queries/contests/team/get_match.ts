import { SmartpingTeamMatchDetails, type TeamMatchLinkParameters } from '@/models/index.js';
import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';

export async function getMatch(matchId: number, extraParameters: TeamMatchLinkParameters) {
	return callAPI({
		endpoint: ApiEndpoints.XML_CHP_RENC,
		requestParameters: (search) => {
			search.set('renc_id', matchId.toString());
			search.set('is_retour', extraParameters.is_retour ? '1': '0');
			search.set('phase', extraParameters.phase.toString());
			search.set('res_1', extraParameters.res_1.toString());
			search.set('res_2', extraParameters.res_2.toString());
			search.set('equip_1', extraParameters.equip_1);
			search.set('equip_2', extraParameters.equip_2);
			search.set('equip_id1', extraParameters.equip_id1.toString());
			search.set('equip_id2', extraParameters.equip_id2.toString());
		},
		normalizationModel: SmartpingTeamMatchDetails,
		rootKey: 'liste',
		additionalProperties: {
			matchId,
			teamAId: extraParameters.equip_id1,
			teamBId: extraParameters.equip_id2,
			phase: extraParameters.phase,
			clubACode: extraParameters.clubnum_1,
			clubBCode: extraParameters.clubnum_2,
		},
		cache: {
			key: `match:${matchId}`,
			ttl: '1d',
		},
	}, true);
}
