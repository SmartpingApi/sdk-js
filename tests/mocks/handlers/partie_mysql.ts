import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import { endpoint, getMockResponse, successHeaders } from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `licence`
 *
 * Réponses possibles :
 * - Si tous les paramètres sont manquants : 200 OK avec une liste vide
 * - Si `licence` est différent de `1610533` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_PARTIE_MYSQL), ({ request }) => {
	const url = new URL(request.url);

	if (url.searchParams.get('licence') !== '1610533') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	return HttpResponse.xml(getMockResponse('partie_mysql', {}), {
		status: 200,
		headers: successHeaders,
	});
});
