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
 * - `numclu` (requis)
 * - `type`
 *
 * Réponses possibles :
 * - Si `numclu` est manquant : 400 Bad Request
 * - Si `numclu` est différent de `10160051` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_EQUIPE), ({ request }) => {
	const url = new URL(request.url);
	const invalidParameters = missingQueryParameters(url, ['numclu']);

	if (invalidParameters) {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: invalidParameters }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	return HttpResponse.xml(getMockResponse('equipe', {}), { status: 200, headers: successHeaders });
});
