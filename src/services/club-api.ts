import Club from '../models/club/club'
import type { ClubConstructorProperties } from '../models/club/club'
import { callAPI, getResponseAsArray } from './smartping-core'
import { ApiEndpoints } from '../enums/api-endpoints'
import ClubDetail from '../models/club/club-detail'
import type { ClubDetailConstructorProperties } from '../models/club/club-detail'
import ClubTeam from '../models/club/club-team'
import type { ClubTeamConstructorProperties } from '../models/club/club-team'

export type TeamType = 'M'|'F'|'A'|'';

export default class ClubApi {
	public static async findClubsByDepartment (department: number): Promise<Club[]> {
		const response = await callAPI<Club, ClubConstructorProperties>({
			endpoint: ApiEndpoints.XML_CLUB_B,
			requestParameters: {
				dep: String(department)
			},
			normalizationModel: Club,
			rootKey: 'club'
		}) as Club|Club[]|undefined;

		return getResponseAsArray(response);
	}

	public static async findClubsByPostalCode (postalCode: string): Promise<Club[]> {
		const response = await callAPI<Club, ClubConstructorProperties>({
			endpoint: ApiEndpoints.XML_CLUB_B,
			requestParameters: {
				code: postalCode
			},
			normalizationModel: Club,
			rootKey: 'club'
		}) as Club|Club[]|undefined;

		return getResponseAsArray(response);
	}

	public static async findClubsByCity (city: string): Promise<Club[]> {
		const response = await callAPI<Club, ClubConstructorProperties>({
			endpoint: ApiEndpoints.XML_CLUB_B,
			requestParameters: {
				ville: city
			},
			normalizationModel: Club,
			rootKey: 'club'
		}) as Club|Club[]|undefined;

		return getResponseAsArray(response);
	}

	public static async findClubsByName (name: string): Promise<Club[]> {
		const response = await callAPI<Club, ClubConstructorProperties>({
			endpoint: ApiEndpoints.XML_CLUB_B,
			requestParameters: {
				ville: name
			},
			normalizationModel: Club,
			rootKey: 'club'
		}) as Club|Club[]|undefined;

		return getResponseAsArray(response);
	}

	public static async getClub (code: string): Promise<ClubDetail|undefined> {
		return await callAPI<ClubDetail, ClubDetailConstructorProperties>({
			endpoint: ApiEndpoints.XML_CLUB_DETAIL,
			requestParameters: {
				club: code
			},
			normalizationModel: ClubDetail,
			rootKey: 'club'
		}) as ClubDetail|undefined;
	}

	public static async getTeamsForClub (clubCode: string, teamType: TeamType): Promise<ClubTeam[]> {
		const response = await callAPI<ClubTeam, ClubTeamConstructorProperties>({
			endpoint: ApiEndpoints.XML_EQUIPE,
			requestParameters: {
				numclu: clubCode,
				type: teamType
			},
			normalizationModel: ClubTeam,
			rootKey: 'equipe'
		}) as ClubTeam|ClubTeam[]|undefined;

		return getResponseAsArray(response);
	}
}
