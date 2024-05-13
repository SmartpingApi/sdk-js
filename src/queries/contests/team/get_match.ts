import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import type { TeamMatchLinkParameters } from '#src/models/contest/team/team_match.js';
import { SmartpingTeamMatchDetails } from '#src/models/contest/team/team_match_details.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetMatch extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(matchId: number, extraParameters?: TeamMatchLinkParameters) {
		return this.callAPI(
			{
				context: this.context,
				endpoint: ApiEndpoints.XML_CHP_RENC,
				requestParameters: (search) => {
					search.set('renc_id', matchId.toString());

					if (!extraParameters) {
						return;
					}

					search.set('is_retour', extraParameters.is_retour ? '1' : '0');
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
					teamAId: extraParameters?.equip_id1 ?? 0,
					teamBId: extraParameters?.equip_id2 ?? 0,
					phase: extraParameters?.phase ?? 1,
					clubACode: extraParameters?.clubnum_1 ?? '',
					clubBCode: extraParameters?.clubnum_2 ?? '',
				},
				cache: {
					key: `match:${matchId}`,
					ttl: '1d',
				},
			},
			true,
		);
	}
}
