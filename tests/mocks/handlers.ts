import { http, HttpResponse } from 'msw';

import { ApiEndpoints } from '#src/api_endpoints.js';
import { endpoint, errorHeaders, getMockResponse, successHeaders } from '#tests/mocks/utils.js';

export const handlers = [
	http.get(endpoint(ApiEndpoints.XML_CLUB_DETAIL), ({ request }) => {
		const url = new URL(request.url);
		const club = url.searchParams.get('club');

		if (!club) {
			return HttpResponse.xml(getMockResponse('bad_request', { parameter: 'club' }), {
				status: 400,
				headers: errorHeaders,
			});
		}

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
	}),
];
