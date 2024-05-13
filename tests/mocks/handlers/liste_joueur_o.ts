import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import {
	checkQueryParametersExistence,
	endpoint,
	errorHeaders,
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
 * - Si `nom` est différent de `jean` : 200 OK avec une liste vide
 * - Si `prenom` est différent de `dupont` : 200 OK avec une liste vide
 * - Si `licence` est différent de `1610533` : 200 OK avec une liste vide
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_LISTE_JOUEUR_O), ({ request }) => {
	const url = new URL(request.url);

	const { receivedTotal } = checkQueryParametersExistence(url, [
		'club',
		'licence',
		'nom',
		'prenom',
		'valid',
	]);

	if (receivedTotal === 0) {
		return HttpResponse.xml(
			getMockResponse('bad_request_multi', { parameters: 'club et/ou nom et/ou licence' }),
			{
				status: 400,
				headers: errorHeaders,
			},
		);
	}

	const firstname = url.searchParams.get('prenom');
	const lastname = url.searchParams.get('nom');
	const club = url.searchParams.get('club');

	if (club && club !== '10160051') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	if (firstname && firstname !== 'jean') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	if (lastname && lastname !== 'dupont') {
		return HttpResponse.xml(getMockResponse('empty_list', {}), {
			status: 200,
			headers: successHeaders,
		});
	}

	return HttpResponse.xml(getMockResponse('liste_joueur_o', {}), {
		status: 200,
		headers: successHeaders,
	});
});
