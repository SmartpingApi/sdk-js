import News from '../models/common/news'
import { OrganizationType } from '../services/organization-api'
import Organization from '../models/organization/organization'
import Club from '../models/club/club'
import ClubDetail from '../models/club/club-detail'
import { TeamType } from '../services/club-api'
import ClubTeam from '../models/club/club-team'
import RankedPlayer from '../models/player/ranked-player'
import SpidPlayer from '../models/player/spid-player'
import Player from '../models/player/player'
import PlayerDetails from '../models/player/player-details'
import RankedGame from '../models/player/ranked-game'
import SpidGame from '../models/player/spid-game'
import Game from '../models/player/game'
import PlayerRankHistory from '../models/player/player-rank-history'
import { ContestType } from '../services/contest-api'
import Contest from '../models/contest/contest'
import Division from '../models/contest/division'
import TeamPool from '../models/contest/team/team-pool'
import TeamMatch, { LinkParameters } from '../models/contest/team/team-match'
import TeamPoolRank from '../models/contest/team/team-pool-rank'
import TeamMatchDetails from '../models/contest/team/team-match-details'
import IndividualContestGroup
	from '../models/contest/individual/individual-contest-group'
import IndividualContestGame
	from '../models/contest/individual/individual-contest-game'
import IndividualContestRank
	from '../models/contest/individual/individual-contest-rank'
import FederalCriteriumRank
	from '../models/contest/individual/federal-criterium-rank'

export default abstract class SmartpingInterface {
	abstract authenticate(): Promise<boolean>;
	abstract getFederationNewsFeed(): Promise<News[]>;
	abstract findOrganizationsByType(organizationType: OrganizationType): Promise<Organization[]>;
	abstract getOrganization(organizationId: number): Promise<Organization|undefined>;
	abstract getOrganizationChildren(organizationId: number): Promise<Organization[]>;
	abstract findClubsByDepartment(department: number): Promise<Club[]>;
	abstract findClubsByPostalCode(postalCode: string): Promise<Club[]>;
	abstract findClubsByCity(city: string): Promise<Club[]>;
	abstract findClubsByName(name: string): Promise<Club[]>;
	abstract getClub(code: string): Promise<ClubDetail|undefined>;
	abstract getTeamsForClub(clubCode: string, teamType: TeamType): Promise<ClubTeam[]>;
	abstract findPlayersByNameOnRankingBase(lastname: string, firstname?: string): Promise<RankedPlayer[]>;
	abstract findPlayersByNameOnSpidBase(lastname: string, firstname?: string, valid?: boolean): Promise<SpidPlayer[]>;
	abstract findPlayersByName(lastname: string, firstname?: string, valid?: boolean): Promise<Player[]>;
	abstract findPlayersByClubOnRankingBase(clubCode: string): Promise<RankedPlayer[]>;
	abstract findPlayersByClubOnSpidBase(clubCode: string, valid?: boolean): Promise<SpidPlayer[]>;
	abstract findPlayersByClub(clubCode: string, valid?: boolean): Promise<Player[]>;
	abstract getPlayerOnRankingBase(licence: string): Promise<RankedPlayer|undefined>;
	abstract getPlayerOnSpidBase(licence: string): Promise<SpidPlayer|undefined>;
	abstract getPlayer(licence: string): Promise<PlayerDetails|undefined>;
	abstract getPlayerGameHistoryOnRankingBase(licence: string): Promise<RankedGame[]>;
	abstract getPlayerGameHistoryOnSpidBase(licence: string): Promise<SpidGame[]>;
	abstract getPlayerGameHistory(licence: string): Promise<Game[]>;
	abstract getPlayerRankHistory(licence: string): Promise<PlayerRankHistory[]>;
	abstract findContests(organizationId: number, contestType: ContestType): Promise<Contest[]>;
	abstract findDivisionsForContest(organizationId: number, contestId: number, contestType: ContestType): Promise<Division[]>;
	abstract getTeamChampionshipPoolsForDivision(divisionId: number): Promise<TeamPool[]>;
	abstract getTeamChampionshipMatchesForPool(divisionId: number, poolId?: number): Promise<TeamMatch[]>;
	abstract getTeamChampionshipPoolRanking(divisionId: number, poolId?: number): Promise<TeamPoolRank[]>;
	abstract getTeamChampionshipMatch(matchId: number, extraParameters: LinkParameters): Promise<TeamMatchDetails[]>;
	abstract getIndividualContestGroup(contestId: number, divisionId: number): Promise<IndividualContestGroup[]>;
	abstract getIndividualContestGames(contestId: number, divisionId: number, groupId?: number): Promise<IndividualContestGame[]>;
	abstract getIndividualContestRank(contestId: number, divisionId: number, groupId?: number): Promise<IndividualContestRank[]>;
	abstract getFederalCriteriumRankForDivision(divisionId: number): Promise<FederalCriteriumRank[]>;
}
