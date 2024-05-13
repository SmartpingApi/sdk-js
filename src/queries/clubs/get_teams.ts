import { ApiEndpoints } from '#src/api_endpoints.js';
import Query from '#src/helpers/query.js';
import { SmartpingClubTeam } from '#src/models/club/club_team.js';
import type { SmartpingContext } from '#src/smartping.js';

export const TeamTypes = {
	men: 'M',
	women: 'F',
	all: 'A',
	none: '',
} as const;

export type TeamType = keyof typeof TeamTypes;

export class GetTeamsForClub extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(clubCode: string, teamType: TeamType) {
		return this.callAPI({
			context: this.context,
			endpoint: ApiEndpoints.XML_EQUIPE,
			requestParameters: (search) => {
				search.set('numclu', clubCode);
				search.set('type', TeamTypes[teamType]);
			},
			normalizationModel: SmartpingClubTeam,
			rootKey: 'equipe',
			cache: {
				key: `teams:${clubCode}:${TeamTypes[teamType]}`,
				ttl: '1w',
			},
		});
	}
}
