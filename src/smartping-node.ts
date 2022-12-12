import { Smartping } from './smartping'
import https from 'node:https'

async function fetchWrapper(endpoint: string, queryParameters: URLSearchParams): Promise<string> {
	return new Promise((resolve, reject) => {
		https.get(endpoint+'?'+queryParameters.toString(), {}, (response) => {
			let data = '';

			if (response.statusCode !== 200) {
				reject(`Wrong status code received. Expected 200 / Received ${response.statusCode}`)
			}

			response.on('data', (chunk) => {
				data += chunk;
			})

			response.on('error', (error) => reject(error.message))
			response.on('end', () => resolve(data));
		}).end();
	})
}

export default class SmartpingNodeAPI extends Smartping {
	constructor (appId: string, appKey: string) {
		super(appId, appKey, fetchWrapper);
	}
}
