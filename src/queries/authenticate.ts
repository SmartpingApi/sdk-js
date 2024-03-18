import { callAPI } from '@/helpers/request.js';
import { ApiEndpoints } from '@/api_endpoints.js';
import { SmartpingInitialization } from '@/models/index.js';

export async function authenticate() {
	return callAPI({
		endpoint: ApiEndpoints.XML_INITIALISATION,
		normalizationModel: SmartpingInitialization,
		rootKey: 'initialisation',
		cache: false,
	}, true);
}
