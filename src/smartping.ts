import type { FetchCallback } from './services/smartping-core'
import { setCredentials, setFetchCallback } from './services/smartping-core'
import Club from './models/club/club'
import Organization from './models/organization/organization'
import CommonApi from './services/common-api'
import News from './models/common/news'
import OrganizationApi, { OrganizationType } from './services/organization-api'
import ClubDetail from './models/club/club-detail'
import ClubTeam from './models/club/club-team'
import ClubApi, { TeamType } from './services/club-api'
import RankedPlayer from './models/player/ranked-player'
import SpidPlayer from './models/player/spid-player'
import Player from './models/player/player'
import PlayerDetails from './models/player/player-details'
import RankedGame from './models/player/ranked-game'
import SpidGame from './models/player/spid-game'
import Game from './models/player/game'
import PlayerRankHistory from './models/player/player-rank-history'
import PlayerApi from './services/player-api'
import Contest from './models/contest/contest'
import ContestApi, { ContestType } from './services/contest-api'
import Division from './models/contest/division'
import TeamPool from './models/contest/team/team-pool'
import TeamMatch, { LinkParameters } from './models/contest/team/team-match'
import TeamPoolRank from './models/contest/team/team-pool-rank'
import TeamMatchDetails from './models/contest/team/team-match-details'
import TeamContestApi from './services/team-contest-api'
import IndividualContestGroup
	from './models/contest/individual/individual-contest-group'
import IndividualContestGame
	from './models/contest/individual/individual-contest-game'
import IndividualContestRank
	from './models/contest/individual/individual-contest-rank'
import FederalCriteriumRank
	from './models/contest/individual/federal-criterium-rank'
import IndividualContestApi from './services/individual-contest-api'
import SmartpingInterface from './contracts/smartping-interface'

export abstract class Smartping implements SmartpingInterface {
	protected constructor (appId: string, appKey: string, fetchWrapper: FetchCallback) {
		setCredentials(appId, appKey);
		setFetchCallback(fetchWrapper);
	}

	public async authenticate(): Promise<boolean> {
		return CommonApi.authenticate();
	}

	public async getFederationNewsFeed(): Promise<News[]> {
		return CommonApi.getFederationNewsFeed();
	}

	public async findOrganizationsByType(organizationType: OrganizationType): Promise<Organization[]> {
		return OrganizationApi.findOrganizationsByType(organizationType);
	}

	public async getOrganization(organizationId: number): Promise<Organization|undefined> {
		return OrganizationApi.getOrganization(organizationId);
	}

	public async getOrganizationChildren(organizationId: number): Promise<Organization[]> {
		return OrganizationApi.getOrganizationChildren(organizationId);
	}

	public async findClubsByDepartment(department: number): Promise<Club[]> {
		return ClubApi.findClubsByDepartment(department);
	}

	public async findClubsByPostalCode(postalCode: string): Promise<Club[]> {
		return ClubApi.findClubsByPostalCode(postalCode);
	}

	public async findClubsByCity(city: string): Promise<Club[]> {
		return ClubApi.findClubsByCity(city);
	}

	public async findClubsByName(name: string): Promise<Club[]> {
		return ClubApi.findClubsByName(name);
	}

	public async getClub(code: string): Promise<ClubDetail|undefined> {
		return ClubApi.getClub(code);
	}

	public async getTeamsForClub(clubCode: string, teamType: TeamType): Promise<ClubTeam[]> {
		return ClubApi.getTeamsForClub(clubCode, teamType);
	}

	public async findPlayersByNameOnRankingBase(lastname: string, firstname?: string): Promise<RankedPlayer[]> {
		return PlayerApi.findPlayersByNameOnRankingBase(lastname, firstname);
	}

	public async findPlayersByNameOnSpidBase(lastname: string, firstname?: string, valid = false): Promise<SpidPlayer[]> {
		return PlayerApi.findPlayersByNameOnSpidBase(lastname, firstname, valid);
	}

	public async findPlayersByName(lastname: string, firstname?: string, valid = false): Promise<Player[]> {
		return PlayerApi.findPlayersByName(lastname, firstname, valid);
	}

	public async findPlayersByClubOnRankingBase(clubCode: string): Promise<RankedPlayer[]> {
		return PlayerApi.findPlayersByClubOnRankingBase(clubCode);
	}

	public async findPlayersByClubOnSpidBase(clubCode: string, valid = false): Promise<SpidPlayer[]> {
		return PlayerApi.findPlayersByClubOnSpidBase(clubCode, valid);
	}

	public async findPlayersByClub(clubCode: string, valid = false): Promise<Player[]> {
		return PlayerApi.findPlayersByClub(clubCode, valid);
	}

	public async getPlayerOnRankingBase(licence: string): Promise<RankedPlayer|undefined> {
		return PlayerApi.getPlayerOnRankingBase(licence);
	}

	public async getPlayerOnSpidBase(licence: string): Promise<SpidPlayer|undefined> {
		return PlayerApi.getPlayerOnSpidBase(licence);
	}

	public async getPlayer(licence: string): Promise<PlayerDetails|undefined> {
		return PlayerApi.getPlayer(licence);
	}

	public async getPlayerGameHistoryOnRankingBase(licence: string): Promise<RankedGame[]> {
		return PlayerApi.getPlayerGameHistoryOnRankingBase(licence);
	}

	public async getPlayerGameHistoryOnSpidBase(licence: string): Promise<SpidGame[]> {
		return PlayerApi.getPlayerGameHistoryOnSpidBase(licence);
	}

	public async getPlayerGameHistory(licence: string): Promise<Game[]> {
		return PlayerApi.getPlayerGameHistory(licence);
	}

	public async getPlayerRankHistory(licence: string): Promise<PlayerRankHistory[]> {
		return PlayerApi.getPlayerRankHistory(licence);
	}

	public async findContests(organizationId: number, contestType: ContestType): Promise<Contest[]> {
		return ContestApi.findContests(organizationId, contestType);
	}

	public async findDivisionsForContest(organizationId: number, contestId: number, contestType: ContestType): Promise<Division[]> {
		return ContestApi.findDivisionsForContest(organizationId, contestId, contestType);
	}

	public async getTeamChampionshipPoolsForDivision(divisionId: number): Promise<TeamPool[]> {
		return TeamContestApi.getTeamChampionshipPoolsForDivision(divisionId);
	}

	public async getTeamChampionshipMatchesForPool(divisionId: number, poolId?: number): Promise<TeamMatch[]> {
		return TeamContestApi.getTeamChampionshipMatchesForPool(divisionId, poolId);
	}

	public async getTeamChampionshipPoolRanking(divisionId: number, poolId?: number): Promise<TeamPoolRank[]> {
		return TeamContestApi.getTeamChampionshipPoolRanking(divisionId, poolId);
	}

	public async getTeamChampionshipMatch(matchId: number, extraParameters: LinkParameters): Promise<TeamMatchDetails[]> {
		return TeamContestApi.getTeamChampionshipMatch(matchId, extraParameters);
	}

	public async getIndividualContestGroup(contestId: number, divisionId: number): Promise<IndividualContestGroup[]> {
		return IndividualContestApi.getIndividualContestGroup(contestId, divisionId);
	}

	public async getIndividualContestGames(contestId: number, divisionId: number, groupId?: number): Promise<IndividualContestGame[]> {
		return IndividualContestApi.getIndividualContestGames(contestId, divisionId, groupId);
	}

	public async getIndividualContestRank(contestId: number, divisionId: number, groupId?: number): Promise<IndividualContestRank[]> {
		return IndividualContestApi.getIndividualContestRank(contestId, divisionId, groupId);
	}

	public async getFederalCriteriumRankForDivision(divisionId: number): Promise<FederalCriteriumRank[]> {
		return IndividualContestApi.getFederalCriteriumRankForDivision(divisionId);
	}
}


