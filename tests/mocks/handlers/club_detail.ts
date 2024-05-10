import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import { endpoint, errorHeaders, getMockResponse, missingQueryParameters, successHeaders } from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `club` (requis)
 *
 * Réponses possibles :
 * - Si `club` est manquant : 400 Bad Request
 * - Si `club` est différent de `10160051` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_CLUB_DETAIL), ({ request }) => {
	const url = new URL(request.url);
	const invalidParameter = missingQueryParameters(url, ['club']);

	if (invalidParameter) {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: invalidParameter }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	const club = url.searchParams.get('club');

	if (club !== '10160051') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	return HttpResponse.xml(
		getMockResponse('club_detail', {
			federalId: club.replace('1', '2'),
			code: club,
		}),
		{ status: 200, headers: successHeaders },
	);
});
