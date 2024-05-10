import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import {
	endpoint, errorHeaders,
	getMockResponse, missingQueryParameters,
	successHeaders,
} from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `numlic` (requis)
 *
 * Réponses possibles :
 * - Si tous les paramètres sont manquants : 400 Bad Request
 * - Si `numlic` est différent de `1610533` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_PARTIE), ({ request }) => {
	const url = new URL(request.url);
	const invalidParameters = missingQueryParameters(url, ['numlic']);

	if (invalidParameters) {
		return HttpResponse.xml(getMockResponse('bad_request_2', { parameter: invalidParameters }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	if (url.searchParams.get('numlic') !== '1610533') {
		return HttpResponse.xml(
			getMockResponse('empty_list', {}),
			{ status: 200, headers: successHeaders },
		);
	}

	return HttpResponse.xml(
		getMockResponse('partie', {}),
		{ status: 200, headers: successHeaders },
	);
});
