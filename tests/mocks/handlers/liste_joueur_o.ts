import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import {
	checkQueryParametersExistence,
	endpoint, errorHeaders,
	getMockResponse,
	successHeaders,
} from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `club` (au moins un requis)
 * - `licence` (au moins un requis)
 * - `nom` (au moins un requis)
 * - `prenom`
 * - `valid`
 *
 * Réponses possibles :
 * - Si tous les paramètres sont manquants : 400 Bad Request
 * - Si `club` est différent de `10160051` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_LISTE_JOUEUR_O), ({ request }) => {
	const url = new URL(request.url);

	const { receivedTotal } = checkQueryParametersExistence(url, ['club', 'licence', 'nom', 'prenom', 'valid']);

	if (receivedTotal === 0) {
		return HttpResponse.xml(getMockResponse('bad_request_multi', { parameters: 'club et/ou nom et/ou licence' }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	if (url.searchParams.get('club') !== '10160051') {
		return HttpResponse.xml(
			getMockResponse('empty_list', {}),
			{ status: 200, headers: successHeaders },
		);
	}

	return HttpResponse.xml(
		getMockResponse('liste_joueur_o', {}),
		{ status: 200, headers: successHeaders },
	);
});
