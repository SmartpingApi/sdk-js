import { Smartping } from './smartping'

async function fetchWrapper(endpoint: string, queryParameters: URLSearchParams): Promise<string> {
	const response = await fetch(endpoint+'?'+queryParameters.toString(), {
		method: 'GET'
	});

	return response.text();
}

export default class SmartpingBrowserAPI extends Smartping {
	constructor (appId: string, appKey: string) {
		super(appId, appKey, fetchWrapper);
	}
}
