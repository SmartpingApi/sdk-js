import { callAPI, getResponseAsArray } from './smartping-core'
import { ApiEndpoints } from '../enums/api-endpoints'
import Initialization from '../models/common/initialization'
import type { InitializationConstructorProperties } from '../models/common/initialization'
import News from '../models/common/news'
import type { NewsConstructorProperties } from '../models/common/news'

export default class CommonApi {
	public static async authenticate(): Promise<boolean> {
		const response = await callAPI<Initialization, InitializationConstructorProperties>({
			endpoint: ApiEndpoints.XML_INITIALISATION,
			requestParameters: {},
			normalizationModel: Initialization,
			rootKey: 'initialisation'
		}) as Initialization|undefined;

		return response ? response.authorized() : false;
	}

	public static async getFederationNewsFeed(): Promise<News[]> {
		const response = await callAPI<News, NewsConstructorProperties>({
			endpoint: ApiEndpoints.XML_NEW_ACTU,
			requestParameters: {},
			normalizationModel: News,
			rootKey: 'news'
		}) as News|News[]|undefined;

		return getResponseAsArray(response);
	}
}
