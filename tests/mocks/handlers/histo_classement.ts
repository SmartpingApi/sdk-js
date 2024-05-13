import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import {
	endpoint,
	errorHeaders,
	getMockResponse,
	missingQueryParameters,
	successHeaders,
} from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `numlic` (requis)
 *
 * Réponses possibles :
 * - Si `numlic` est manquant : 400 Bad Request
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_HISTO_CLASSEMENT), ({ request }) => {
	const url = new URL(request.url);

	const invalidParameters = missingQueryParameters(url, ['numlic']);
	if (invalidParameters) {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: invalidParameters }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	return HttpResponse.xml(getMockResponse('histo_classement', {}), {
		status: 200,
		headers: successHeaders,
	});
});
