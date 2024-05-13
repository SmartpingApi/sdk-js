import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import { endpoint, errorHeaders, getMockResponse, successHeaders } from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `res_division` (requis)
 * - `action`
 * - `epr`
 * - `cx_tableau`
 *
 * Réponses possibles :
 * - Si tous les paramètres sont manquants : 400 Bad Request
 * - Si `res_division` est différent de `109979` : 400 Bad Request
 * - Si `action` est vide ou égale à `partie` : 200 OK
 * - Si `action` est égale à `classement` : 200 OK
 * - Si `action` est égale à `poule` : 200 OK
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_RESULT_INDIV), ({ request }) => {
	const url = new URL(request.url);

	if (url.searchParams.get('res_division') !== '109979') {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: 'res_division' }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	const action = url.searchParams.get('action');

	if (action === 'poule') {
		return HttpResponse.xml(getMockResponse('result_indiv_poules', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	if (action === 'classement') {
		return HttpResponse.xml(getMockResponse('result_indiv_classement', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	return HttpResponse.xml(getMockResponse('result_indiv_parties', {}), {
		status: 200,
		headers: successHeaders,
	});
});
