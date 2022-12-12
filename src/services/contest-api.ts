import { callAPI, getResponseAsArray } from './smartping-core'
import { ApiEndpoints } from '../enums/api-endpoints'
import Contest from '../models/contest/contest'
import type { ContestConstructorProperties } from '../models/contest/contest'
import Division from '../models/contest/division'
import type { DivisionConstructorProperties } from '../models/contest/division'

export type ContestType = 'E'|'I';

export default class ContestApi {
	public static async findContests(organizationId: number, contestType: ContestType): Promise<Contest[]> {
		const response = await callAPI<Contest, ContestConstructorProperties>({
			endpoint: ApiEndpoints.XML_EPREUVE,
			requestParameters: {
				organisme: String(organizationId),
				type: contestType
			},
			normalizationModel: Contest,
			rootKey: 'epreuve'
		}) as Contest|Contest[]|undefined;

		return getResponseAsArray(response);
	}

	public static async findDivisionsForContest(organizationId: number, contestId: number, contestType: ContestType): Promise<Division[]> {
		const response = await callAPI<Division, DivisionConstructorProperties>({
			endpoint: ApiEndpoints.XML_DIVISION,
			requestParameters: {
				organisme: String(organizationId),
				epreuve: String(contestId),
				type: contestType
			},
			normalizationModel: Division,
			rootKey: 'division'
		}) as Division|Division[]|undefined;

		return getResponseAsArray(response);
	}
}
