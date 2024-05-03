import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingClubTeam } from '#src/models/club/club_team.js';
import type { SmartpingContext } from '#src/smartping.js';
import type { ValueOf } from '#src/types/index.js';

export const TeamTypes = {
	Men: 'M',
	Women: 'F',
	All: 'A',
	None: ''
} as const;

export class GetTeamsForClub extends Query {
	constructor(context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(clubCode: string, teamType: ValueOf<typeof TeamTypes>) {
		return this.callAPI({
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
}
