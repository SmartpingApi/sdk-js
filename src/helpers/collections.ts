import {
	SmartpingGame,
	SmartpingPlayer,
	SmartpingRankedGame,
	SmartpingRankedPlayer,
	SmartpingSPIDGame,
	SmartpingSPIDPlayer,
} from '@/models/index.js';

export function mergeRankedAndSPIDPlayerCollection(rankedPlayers: SmartpingRankedPlayer[], SPIDPlayers: SmartpingSPIDPlayer[]): SmartpingPlayer[] {
	if (rankedPlayers.length === 0 && SPIDPlayers.length === 0) {
		return [];
	}

	const dictionary = new Map<string, { ranked?: SmartpingRankedPlayer, spid?: SmartpingSPIDPlayer }>();

	for (const player of rankedPlayers) {
		dictionary.set(player.licence, { ranked: player });
	}

	for (const player of SPIDPlayers) {
		if (dictionary.has(player.licence)) {
			dictionary.set(player.licence, { ...dictionary.get(player.licence), spid: player });
		} else {
			dictionary.set(player.licence, { spid: player });
		}
	}

	return [...dictionary.values()].map((player) => new SmartpingPlayer(player.ranked, player.spid));
}

function createGameIdentifier(game: SmartpingRankedGame|SmartpingSPIDGame) {
	return `${game.isVictory}//${game.opponentName}//${game.date.toFormat('hhmmssuu')}`;
}

export function mergeRankingAndSPIDGameHistoryCollection(rankingGames: SmartpingRankedGame[], SPIDGames: SmartpingSPIDGame[]): SmartpingGame[] {
	if (rankingGames.length === 0 && SPIDGames.length === 0) {
		return [];
	}

	const dictionary = new Map<string, { ranking?: SmartpingRankedGame, spid?: SmartpingSPIDGame }>();

	for (const game of rankingGames) {
		dictionary.set(createGameIdentifier(game), { ranking: game });
	}

	for (const game of SPIDGames) {
		const identifier = createGameIdentifier(game);
		if (dictionary.has(identifier)) {
			dictionary.set(identifier, { ...dictionary.get(identifier), spid: game });
		} else {
			dictionary.set(identifier, { spid: game });
		}
	}

	return [...dictionary.values()].map((game) => new SmartpingGame(game.ranking, game.spid));
}
