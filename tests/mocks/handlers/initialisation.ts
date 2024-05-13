import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import env from '#tests/env.ts';
import {
	endpoint,
	errorHeaders,
	getMockResponse,
	missingQueryParameters,
	successHeaders,
} from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `serie` (requis)
 * - `id` (requis)
 * - `tm` (requis)
 * - `tmc` (requis)
 *
 * Réponses possibles :
 * - Si un des paramètres est manquant : 401 Unauthorized
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_INITIALISATION), ({ request }) => {
	const url = new URL(request.url);

	const invalidParameters = missingQueryParameters(url, ['serie', 'id', 'tm', 'tmc']);
	if (invalidParameters) {
		return HttpResponse.xml(
			getMockResponse('initialisation_erreur', { message: 'Paramètre manquant' }),
			{
				status: 401,
				headers: errorHeaders,
			},
		);
	}

	if (url.searchParams.get('id') !== env.SMARTPING_APP_ID) {
		return HttpResponse.xml(
			getMockResponse('initialisation_erreur', { message: 'Compte incorrect' }),
			{
				status: 401,
				headers: errorHeaders,
			},
		);
	}

	return HttpResponse.xml(getMockResponse('initialisation', {}), {
		status: 200,
		headers: successHeaders,
	});
});
