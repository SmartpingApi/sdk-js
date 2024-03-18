import { findPlayersByNameOnRankingBase, findPlayersByNameOnSpidBase, findPlayersByName } from './find_by_name.js';
import { findPlayersByClubOnRankingBase, findPlayersByClubOnSpidBase, findPlayersByClub } from './find_by_club.js';
import { getPlayerOnRankingBase, getPlayerOnSpidBase, getPlayerDetails } from './find_by_licence.js';
import { getPlayerGameHistoryOnRankingBase, getPlayerGameHistoryOnSpidBase, getPlayerGameHistory } from './game_history.js';
import { getPlayerRankHistory } from './rank_history.js';

export default {
	rankingBase: {
		findBy: {
			licence: getPlayerOnRankingBase,
			name: findPlayersByNameOnRankingBase,
			club: findPlayersByClubOnRankingBase,
		},
		gameHistory: getPlayerGameHistoryOnRankingBase,
	},
	spidBase: {
		findBy: {
			licence: getPlayerOnSpidBase,
			name: findPlayersByNameOnSpidBase,
			club: findPlayersByClubOnSpidBase,
		},
		gameHistory: getPlayerGameHistoryOnSpidBase,
	},
	findBy: {
		licence: getPlayerDetails,
		name: findPlayersByName,
		clubs: findPlayersByClub,
	},
	gameHistory: getPlayerGameHistory,
	rankHistory: getPlayerRankHistory,
}
