import TeamPool from '../models/contest/team/team-pool'
import type { TeamPoolConstructorProperties } from '../models/contest/team/team-pool'
import { callAPI, getResponseAsArray } from './smartping-core'
import { ApiEndpoints } from '../enums/api-endpoints'
import TeamMatch, { LinkParameters } from '../models/contest/team/team-match'
import type { TeamMatchConstructorProperties } from '../models/contest/team/team-match'
import TeamPoolRank from '../models/contest/team/team-pool-rank'
import type { TeamPoolRankConstructorProperties } from '../models/contest/team/team-pool-rank'
import TeamMatchDetails from '../models/contest/team/team-match-details'
import type { TeamMatchDetailsConstructorProperties } from '../models/contest/team/team-match-details'

export default class TeamContestApi {
	public static async getTeamChampionshipPoolsForDivision(divisionId: number): Promise<TeamPool[]> {
		const response = await callAPI<TeamPool, TeamPoolConstructorProperties>({
			endpoint: ApiEndpoints.XML_RESULT_EQU,
			requestParameters: {
				action: 'poule',
				auto: '1',
				D1: String(divisionId)
			},
			normalizationModel: TeamPool,
			rootKey: 'poule'
		}) as TeamPool|TeamPool[]|undefined;

		return getResponseAsArray(response);
	}

	public static async getTeamChampionshipMatchesForPool(divisionId: number, poolId?: number): Promise<TeamMatch[]> {
		const response = await callAPI<TeamMatch, TeamMatchConstructorProperties>({
			endpoint: ApiEndpoints.XML_RESULT_EQU,
			requestParameters: {
				action: '',
				auto: '1',
				D1: String(divisionId),
				cx_poule: poolId ? String(poolId) : ''
			},
			normalizationModel: TeamMatch,
			rootKey: 'tour'
		}) as TeamMatch|TeamMatch[]|undefined;

		return getResponseAsArray(response);
	}

	public static async getTeamChampionshipPoolRanking(divisionId: number, poolId?: number): Promise<TeamPoolRank[]> {
		const response = await callAPI<TeamPoolRank, TeamPoolRankConstructorProperties>({
			endpoint: ApiEndpoints.XML_RESULT_EQU,
			requestParameters: {
				action: 'classement',
				auto: '1',
				D1: String(divisionId),
				cx_poule: poolId ? String(poolId) : ''
			},
			normalizationModel: TeamPoolRank,
			rootKey: 'classement'
		}) as TeamPoolRank|TeamPoolRank[]|undefined;

		return getResponseAsArray(response);
	}

	public static async getTeamChampionshipMatch(matchId: number, extraParameters: LinkParameters): Promise<TeamMatchDetails[]> {
		const response = await callAPI<TeamMatchDetails, TeamMatchDetailsConstructorProperties>({
			endpoint: ApiEndpoints.XML_CHP_RENC,
			requestParameters: {
				renc_id: String(matchId),
				is_retour: extraParameters.is_retour ? '1': '0',
				phase: String(extraParameters.phase),
				res_1: String(extraParameters.res_1),
				res_2: String(extraParameters.res_2),
				equip_1: extraParameters.equip_1,
				equip_2: extraParameters.equip_2,
				equip_id1: String(extraParameters.equip_id1),
				equip_id2: String(extraParameters.equip_id2),
			},
			normalizationModel: TeamMatchDetails,
			// TODO
			rootKey: 'NOT_DEFINED'
		}) as TeamMatchDetails|TeamMatchDetails[]|undefined;

		return getResponseAsArray(response);
	}
}
