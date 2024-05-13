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
 * - `res_division` (requis)
 *
 * Réponses possibles :
 * - Si tous les paramètres sont manquants : 400 Bad Request
 * - Si `res_division` est différent de `123915` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_RES_CLA), ({ request }) => {
	const url = new URL(request.url);
	const invalidParameter = missingQueryParameters(url, ['res_division']);

	if (invalidParameter) {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: invalidParameter }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	if (url.searchParams.get('res_division') !== '123915') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	return HttpResponse.xml(getMockResponse('res_cla', {}), { status: 200, headers: successHeaders });
});
