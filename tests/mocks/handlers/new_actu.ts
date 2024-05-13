import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import { endpoint, getMockResponse, successHeaders } from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - Aucun
 *
 * Réponses possibles :
 * - 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_NEW_ACTU), () => {
	return HttpResponse.xml(getMockResponse('new_actu', {}), {
		status: 200,
		headers: successHeaders,
	});
});
