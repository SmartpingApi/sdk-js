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
 * - `organisme` (requis)
 * - `type` (requis)
 *
 * Réponses possibles :
 * - Si un des paramètres est manquant : 400 Bad Request
 * - Si `organisme` est différent de `131` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_EPREUVE), ({ request }) => {
	const url = new URL(request.url);

	const invalidParameters = missingQueryParameters(url, ['type', 'organisme']);
	if (invalidParameters) {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: invalidParameters }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	const organizationId = url.searchParams.get('organisme');

	if (organizationId !== '131') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	return HttpResponse.xml(getMockResponse('epreuve', {}), { status: 200, headers: successHeaders });
});
