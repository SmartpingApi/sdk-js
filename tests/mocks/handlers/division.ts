import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import { endpoint, errorHeaders, getMockResponse, missingQueryParameters, successHeaders } from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `epreuve` (requis)
 * - `organisme` (requis)
 * - `type` (requis)
 *
 * Réponses possibles :
 * - Si un des paramètres est manquant : 400 Bad Request
 * - Si `epreuve` est différent de `940` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_DIVISION), ({ request }) => {
	const url = new URL(request.url);
	const invalidParameters = missingQueryParameters(url, ['epreuve', 'organisme', 'type']);

	if (invalidParameters) {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: invalidParameters }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	const contestId = url.searchParams.get('division');

	if (contestId !== '940') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	return HttpResponse.xml(
		getMockResponse('division', {}),
		{ status: 200, headers: successHeaders },
	);
});
