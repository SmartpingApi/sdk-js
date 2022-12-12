import { callAPI, getResponseAsArray } from './smartping-core'
import { ApiEndpoints } from '../enums/api-endpoints'
import IndividualContestGroup from '../models/contest/individual/individual-contest-group'
import type { IndividualContestGroupConstructorProperties } from '../models/contest/individual/individual-contest-group'
import IndividualContestGame from '../models/contest/individual/individual-contest-game'
import type { IndividualContestGameConstructorProperties } from '../models/contest/individual/individual-contest-game'
import IndividualContestRank from '../models/contest/individual/individual-contest-rank'
import type { IndividualContestRankConstructorProperties } from '../models/contest/individual/individual-contest-rank'
import FederalCriteriumRank from '../models/contest/individual/federal-criterium-rank'
import type { FederalCriteriumRankConstructorProperties } from '../models/contest/individual/federal-criterium-rank'

export default class IndividualContestApi {
	public static async getIndividualContestGroup(contestId: number, divisionId: number): Promise<IndividualContestGroup[]> {
		const response = await callAPI<IndividualContestGroup, IndividualContestGroupConstructorProperties>({
			endpoint: ApiEndpoints.XML_RESULT_INDIV,
			requestParameters: {
				action: 'poule',
				epr: String(contestId),
				res_division: String(divisionId),
			},
			normalizationModel: IndividualContestGroup,
			rootKey: 'tour'
		}) as IndividualContestGroup|IndividualContestGroup[]|undefined;

		return getResponseAsArray(response);
	}

	public static async getIndividualContestGames(contestId: number, divisionId: number, groupId?: number): Promise<IndividualContestGame[]> {
		const response = await callAPI<IndividualContestGame, IndividualContestGameConstructorProperties>({
			endpoint: ApiEndpoints.XML_RESULT_INDIV,
			requestParameters: {
				action: 'partie',
				epr: String(contestId),
				res_division: String(divisionId),
				cx_tableau: groupId ? String(groupId) : ''
			},
			normalizationModel: IndividualContestGame,
			rootKey: 'partie'
		}) as IndividualContestGame|IndividualContestGame[]|undefined;

		return getResponseAsArray(response);
	}

	public static async getIndividualContestRank(contestId: number, divisionId: number, groupId?: number): Promise<IndividualContestRank[]> {
		const response = await callAPI<IndividualContestRank, IndividualContestRankConstructorProperties>({
			endpoint: ApiEndpoints.XML_RESULT_INDIV,
			requestParameters: {
				action: 'classement',
				epr: String(contestId),
				res_division: String(divisionId),
				cx_tableau: groupId ? String(groupId) : ''
			},
			normalizationModel: IndividualContestRank,
			rootKey: 'classement'
		}) as IndividualContestRank|IndividualContestRank[]|undefined;

		return getResponseAsArray(response);
	}

	public static async getFederalCriteriumRankForDivision(divisionId: number): Promise<FederalCriteriumRank[]> {
		const response = await callAPI<FederalCriteriumRank, FederalCriteriumRankConstructorProperties>({
			endpoint: ApiEndpoints.XML_RES_CLA,
			requestParameters: {
				res_division: String(divisionId)
			},
			normalizationModel: FederalCriteriumRank,
			rootKey: 'classement'
		}) as FederalCriteriumRank|FederalCriteriumRank[]|undefined;

		return getResponseAsArray(response);
	}
}
