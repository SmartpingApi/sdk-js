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
 * - `licence` (requis)
 *
 * Réponses possibles :
 * - Si `licence` est manquant : 400 Bad Request
 * - Si `licence` est différent de `1610533` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_LICENCE), ({ request }) => {
	const url = new URL(request.url);

	const invalidParameters = missingQueryParameters(url, ['licence']);
	if (invalidParameters) {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: invalidParameters }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	const licence = url.searchParams.get('licence');

	if (licence !== '1610533') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	return HttpResponse.xml(getMockResponse('licence', {}), { status: 200, headers: successHeaders });
});
