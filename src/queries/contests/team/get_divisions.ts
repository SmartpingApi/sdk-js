import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import type { ContestType } from '#src/models/contest/contest';
import { CONTEST_TYPES } from '#src/models/contest/contest';
import { SmartpingDivision } from '#src/models/contest/division';
import { SmartpingIndividualDivision } from '#src/models/contest/individual/individual_division';
import { SmartpingTeamDivision } from '#src/models/contest/team/team_division';
import type { ValueOf } from '#src/types/index';

export async function findDivisionsForContest(organizationId: number, contestId: number, contestType: ValueOf<ContestType>) {
	return callAPI({
		endpoint: ApiEndpoints.XML_DIVISION,
		requestParameters: (search) => {
			search.set('organisme', organizationId.toString());
			search.set('epreuve', contestId.toString());
			search.set('type', contestType);
		},
		normalizationModel: SmartpingDivision,
		rootKey: 'division',
		cache: {
			key: `contests:divisions:${organizationId}:${contestId}`,
			ttl: '1d',
		},
	});
}

export async function findDivisionsForTeamContest(organizationId: number, contestId: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_DIVISION,
		requestParameters: (search) => {
			search.set('organisme', organizationId.toString());
			search.set('epreuve', contestId.toString());
			search.set('type', CONTEST_TYPES.TEAM);
		},
		normalizationModel: SmartpingTeamDivision,
		rootKey: 'division',
		cache: {
			key: `contests:divisions:${organizationId}:${contestId}`,
			ttl: '1d',
		},
	});
}

export async function findDivisionsForIndividualContest(organizationId: number, contestId: number) {
	return callAPI({
		endpoint: ApiEndpoints.XML_DIVISION,
		requestParameters: (search) => {
			search.set('organisme', organizationId.toString());
			search.set('epreuve', contestId.toString());
			search.set('type', CONTEST_TYPES.TEAM);
		},
		normalizationModel: SmartpingIndividualDivision,
		rootKey: 'division',
		cache: {
			key: `contests:divisions:${organizationId}:${contestId}`,
			ttl: '1d',
		},
	});
}
