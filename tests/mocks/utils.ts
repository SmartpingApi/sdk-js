import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { DateTime } from 'luxon';

const baseUrl = 'https://apiv2.fftt.com/mobile/pxml';

export function endpoint(path: string) {
	return baseUrl + path;
}

const defaultHeaders = {
	'date': DateTime.now().toHTTP(),
	'server': 'Apache',
	'cache-control': 'no-cache, private',
	'cache-version': '8e06150efd0545adee451f9755411c6b',
	'current-season': '24',
	'current-season-update': '2023-07-04T10:10:49+02:00',
	'link':
		'<http://apiv2.fftt.com/api/docs.jsonld>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"',
	'content-security-policy': "frame-ancestors 'self'",
	'access-control-allow-origin': '*',
	'access-control-allow-methods': 'GET, POST, OPTIONS, DELETE, PUT',
	'access-control-allow-headers':
		'DNT,authorization,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Cache-Version,Content-disposition,Current-Season,Current-Season-Update',
	'access-control-expose-headers':
		'Content-Length,Content-Range,Cache-Version,Content-disposition,Current-Season,Current-Season-Update',
	'x-xss-protection': '1; mode=block',
};

export const errorHeaders = {
	...defaultHeaders,
	'content-type': 'application/xml',
};

export const successHeaders = {
	...defaultHeaders,
	'content-type': 'application/xml;charset=ISO-8859-1',
};

export const httpHeaders = {
	'date': DateTime.now().toHTTP(),
	'server': 'Apache',
	'x-frame-options': 'SAMEORIGIN',
	'x-xss-protection': '1; mode=block',
	'content-length': '0',
	'content-type': 'text/html; charset=UTF-8',
};

const mockResponses = {
	bad_request: ['parameter'],
	bad_request_2: ['parameter'],
	bad_request_multi: ['parameters'],
	chp_renc: [],
	club_b: [],
	club_dep2: [],
	club_detail: ['federalId', 'code'],
	division: [],
	empty_list: [],
	epreuve: [],
	equipe: [],
	histo_classement: [],
	initialisation: [],
	initialisation_erreur: ['message'],
	invalid_request: ['parameter'],
	joueur: [],
	licence: [],
	licence_b: [],
	liste_joueur: [],
	liste_joueur_o: [],
	new_actu: [],
	organisme: [],
	partie: [],
	partie_mysql: [],
	res_cla: [],
	result_equ_rencontres: [],
	result_equ_classement: [],
	result_equ_initial: [],
	result_equ_poule: [],
	result_indiv_parties: [],
	result_indiv_poules: [],
	result_indiv_classement: [],
} as const;

type MockResponse = keyof typeof mockResponses;

type MockResponseReplacements<MockName extends MockResponse> = Record<
	typeof mockResponses[MockName][number],
	string
>;

export function getMockResponse<Response extends MockResponse>(
	name: Response,
	replacements: MockResponseReplacements<Response>,
) {
	const filePath = path.resolve(
		path.dirname(fileURLToPath(import.meta.url)),
		`responses/${name}.xml`,
	);
	const file = readFileSync(filePath, { encoding: 'utf8' });

	if (Object.entries(replacements).length <= 0) return file;

	let result = file;

	for (const [key, value] of Object.entries<string>(replacements)) {
		result = result.replaceAll(new RegExp(`{{${key}}}`, 'g'), value);
	}

	return result;
}

export function missingQueryParameters(url: URL, parameters: Array<string>) {
	let invalid: string | undefined;

	for (const name of parameters) {
		if (url.searchParams.has(name)) continue;

		invalid = name;
		break;
	}

	return invalid;
}

export function checkQueryParametersExistence(url: URL, parameters: Array<string>) {
	const received: Array<string> = [];

	for (const name of parameters) {
		if (url.searchParams.has(name)) {
			received.push(name);
		}
	}

	return {
		received,
		receivedTotal: received.length,
		missing: parameters.filter((name) => !received.includes(name)),
	};
}
