import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import {
	endpoint, errorHeaders,
	getMockResponse, missingQueryParameters,
	successHeaders,
} from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `type` (requis)
 *
 * Réponses possibles :
 * - Si tous les paramètres sont manquants : 400 Bad Request
 * - Si `type` est différent de `F` `Z` `L` ou `D` : 400 Bad Request
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_ORGANISME), ({ request }) => {
	const url = new URL(request.url);
	const invalidParameters = missingQueryParameters(url, ['type']);

	if (invalidParameters) {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: invalidParameters }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	const type = url.searchParams.get('type');

	if (!type || !([ 'F', 'Z', 'L', 'D' ].includes(type))) {
		return HttpResponse.xml(
			getMockResponse('invalid_request', { parameter: 'type' }),
			{ status: 400, headers: errorHeaders },
		);
	}

	return HttpResponse.xml(
		getMockResponse('organisme', {}),
		{ status: 200, headers: successHeaders },
	);
});
