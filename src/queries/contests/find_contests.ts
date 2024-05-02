import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import type { ContestType } from '#src/models/contest/contest';
import { SmartpingContest } from '#src/models/contest/contest';
import type { ValueOf } from '#src/types/index';

export async function findContests(organizationId: number, contestType: ValueOf<ContestType>) {
	return callAPI({
		endpoint: ApiEndpoints.XML_EPREUVE,
		requestParameters: (search) => {
			search.set('organisme', organizationId.toString());
			search.set('type', contestType);
		},
		normalizationModel: SmartpingContest,
		rootKey: 'epreuve',
		cache: {
			key: `contests:${organizationId}:${contestType}`,
			ttl: '1d',
		},
	});
}
