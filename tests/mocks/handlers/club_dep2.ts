import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import { checkQueryParametersExistence, endpoint, getMockResponse, successHeaders } from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * ========================================================
 * - `dep`
 *
 * Réponses possibles :
 * ========================================================
 * - Si aucun paramètre n'est fourni : 200 OK
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_CLUB_DEP_2), ({ request }) => {
	const url = new URL(request.url);
	const { receivedTotal } = checkQueryParametersExistence(url, ['dep']);

	if (receivedTotal === 0) {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	return HttpResponse.xml(
		getMockResponse('club_dep2', {}),
		{ status: 200, headers: successHeaders },
	);
});
