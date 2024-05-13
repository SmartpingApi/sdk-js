import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import {
	checkQueryParametersExistence,
	endpoint,
	getMockResponse,
	successHeaders,
} from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `dep`
 * - `code`
 * - `ville`
 * - `numero`
 *
 * Réponses possibles :
 * - Si aucun paramètre n'est fourni : 200 OK avec une liste vide
 * - Si `ville` est différent de `castelnovien` : 200 OK avec une liste vide
 * - Si `numero` est différent de `10160051` : 200 OK avec une liste vide
 * - Si `code` est différent de `33000` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_CLUB_B), ({ request }) => {
	const url = new URL(request.url);
	const { receivedTotal } = checkQueryParametersExistence(url, ['dep', 'code', 'ville', 'numero']);

	if (receivedTotal === 0) {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	const city = url.searchParams.get('ville');
	const code = url.searchParams.get('numero');
	const postalCode = url.searchParams.get('code');

	if (city && city !== 'castelnovien') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	if (code && code !== '10160051') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	if (postalCode && postalCode !== '33000') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	return HttpResponse.xml(getMockResponse('club_b', {}), { status: 200, headers: successHeaders });
});
