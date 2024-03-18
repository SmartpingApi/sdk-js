import { getFederalCriteriumRankForDivision } from './federal_criterium_rank.js';
import { getIndividualContestGames } from './get_games.js';
import { getIndividualContestGroup } from './get_groups.js';
import { getIndividualContestRank } from './get_rank.js';

export default {
	getFederalCriteriumRankForDivision,
	getGames: getIndividualContestGames,
	getGroup: getIndividualContestGroup,
	getRank: getIndividualContestRank,
}
