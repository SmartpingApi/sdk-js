import { ApiEndpoints } from '#src/api_endpoints';
import { callAPI } from '#src/helpers/request';
import { SmartpingInitialization } from '#src/models/common/initialization';

export async function authenticate() {
	return callAPI({
		endpoint: ApiEndpoints.XML_INITIALISATION,
		normalizationModel: SmartpingInitialization,
		rootKey: 'initialisation',
		cache: false,
	}, true);
}
