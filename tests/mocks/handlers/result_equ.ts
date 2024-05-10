import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import {
	endpoint, errorHeaders,
	getMockResponse, missingQueryParameters,
	successHeaders,
} from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `D1` (requis)
 * - `action`
 * - `auto`
 * - `cx_poule`
 *
 * Réponses possibles :
 * - Si tous les paramètres sont manquants : 400 Bad Request
 * - Si `D1` est différent de `126363` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_RESULT_EQU), ({ request }) => {
	const url = new URL(request.url);
	const invalidParameter = missingQueryParameters(url, ['D1']);

	if (invalidParameter) {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: invalidParameter }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	if (url.searchParams.get('D1') !== '126363') {
		return HttpResponse.xml(
			getMockResponse('empty_list', {}),
			{ status: 200, headers: successHeaders },
		);
	}

	return HttpResponse.xml(
		getMockResponse('result_equ', {}),
		{ status: 200, headers: successHeaders },
	);
});
