import type { ValueOf } from '@/types/index.js';
import type { ContestType } from '@/models/index.js';
import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { CONTEST_TYPES, SmartpingDivision, SmartpingIndividualDivision, SmartpingTeamDivision } from '@/models/index.js';

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
