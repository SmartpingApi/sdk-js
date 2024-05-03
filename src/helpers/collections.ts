import { SmartpingGame } from '#src/models/player/game.js';
import { SmartpingPlayer } from '#src/models/player/player.js';
import type { SmartpingRankedGame } from '#src/models/player/ranked_game.js';
import type { SmartpingRankedPlayer } from '#src/models/player/ranked_player.js';
import type { SmartpingSPIDGame } from '#src/models/player/spid_game.js';
import type { SmartpingSPIDPlayer } from '#src/models/player/spid_player.js';

export function mergeRankedAndSPIDPlayerCollection(
	rankedPlayers: Array<SmartpingRankedPlayer>,
	SPIDPlayers: Array<SmartpingSPIDPlayer>,
): Array<SmartpingPlayer> {
	if (rankedPlayers.length === 0 && SPIDPlayers.length === 0) {
		return [];
	}

	const dictionary = new Map<
		string,
		{ ranked?: SmartpingRankedPlayer; spid?: SmartpingSPIDPlayer }
	>();

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

function createGameIdentifier(game: SmartpingRankedGame | SmartpingSPIDGame) {
	return `${game.isVictory}//${game.opponentName}//${game.date.toFormat('hhmmssuu')}`;
}

export function mergeRankingAndSPIDGameHistoryCollection(
	rankingGames: Array<SmartpingRankedGame>,
	SPIDGames: Array<SmartpingSPIDGame>,
): Array<SmartpingGame> {
	if (rankingGames.length === 0 && SPIDGames.length === 0) {
		return [];
	}

	const dictionary = new Map<string, { ranking?: SmartpingRankedGame; spid?: SmartpingSPIDGame }>();

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
