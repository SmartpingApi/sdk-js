import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import {
	checkQueryParametersExistence,
	endpoint,
	getMockResponse,
	httpHeaders,
	successHeaders,
} from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `club`
 * - `nom`
 * - `prenom`
 *
 * Réponses possibles :
 * - Si tous les paramètres sont manquants : 200 OK (sans contenu, format HTML)
 * - Si `club` est différent de `10160051` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_LISTE_JOUEUR), ({ request }) => {
	const url = new URL(request.url);

	const { receivedTotal } = checkQueryParametersExistence(url, ['club', 'nom', 'prenom']);

	if (receivedTotal === 0) {
		return HttpResponse.text('', { status: 200, headers: httpHeaders });
	}

	if (url.searchParams.get('club') !== '10160051') {
		return HttpResponse.xml(
			getMockResponse('empty_list', {}),
			{ status: 200, headers: successHeaders },
		);
	}

	return HttpResponse.xml(
		getMockResponse('liste_joueur', {}),
		{ status: 200, headers: successHeaders },
	);
});
