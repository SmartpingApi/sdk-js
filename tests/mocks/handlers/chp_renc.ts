import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import { endpoint, errorHeaders, getMockResponse, missingQueryParameters, successHeaders } from '#tests/mocks/utils.js';

/**
 * Paramètres attendus :
 * - `renc_id` (requis)
 * - `is_retour`
 * - `phase`
 * - `res_1`
 * - `res_2`
 * - `equip_1`
 * - `equip_2`
 * - `equip_id1`
 * - `equip_id2`
 *
 * Réponses possibles :
 * - Si `renc_id` est manquant : 400 Bad Request
 * - Sinon : 200 OK
 */
export default http.get(endpoint(ApiEndpoints.XML_CHP_RENC), ({ request }) => {
	const url = new URL(request.url);

	const invalidParameter = missingQueryParameters(url, ['renc_id']);

	if (invalidParameter) {
		return HttpResponse.xml(getMockResponse('bad_request', { parameter: invalidParameter }), {
			status: 400,
			headers: errorHeaders,
		});
	}

	return HttpResponse.xml(
		getMockResponse('chp_renc', {}),
		{ status: 200, headers: successHeaders },
	);
});
