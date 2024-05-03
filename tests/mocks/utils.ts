import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
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

const mockResponses = {
	empty_list: [],
	bad_request: ['parameter'],
	club_detail: ['federalId', 'code'],
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
	const filePath = resolve(dirname(fileURLToPath(import.meta.url)), `responses/${name}.xml`);
	const file = readFileSync(filePath, { encoding: 'utf8' });

	if (Object.entries(replacements).length <= 0) return file;

	let result = file;

	for (const [key, value] of Object.entries<string>(replacements)) {
		result = result.replaceAll(new RegExp(`{{${key}}}`, 'g'), value);
	}

	return result;
}
