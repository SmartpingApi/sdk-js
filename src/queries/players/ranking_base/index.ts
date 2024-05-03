import type { QueryOptions } from '#src/helpers/query.js';
import { FindPlayersByClubOnRankingBase } from '#src/queries/players/ranking_base/find_by_club.js';
import { GetPlayerOnRankingBase } from '#src/queries/players/ranking_base/find_by_licence.js';
import { FindPlayersByNameOnRankingBase } from '#src/queries/players/ranking_base/find_by_name.js';
import { GetPlayerGameHistoryOnRankingBase } from '#src/queries/players/ranking_base/game_history.js';
import type { SmartpingContext } from '#src/smartping.js';

export default class PlayerRankingBaseQueries {
	#context: SmartpingContext;

	constructor(context: SmartpingContext) {
		this.#context = context;
	}

	findByClub(clubCode: string, options?: QueryOptions) {
		return FindPlayersByClubOnRankingBase.create(this.#context).withOptions(options).run(clubCode);
	}

	getPlayer(licence: string, options?: QueryOptions) {
		return GetPlayerOnRankingBase.create(this.#context).withOptions(options).run(licence);
	}

	findByName(lastname: string, firstname?: string, options?: QueryOptions) {
		return FindPlayersByNameOnRankingBase.create(this.#context)
			.withOptions(options)
			.run(lastname, firstname);
	}

	getGameHistory(licence: string, options?: QueryOptions) {
		return GetPlayerGameHistoryOnRankingBase.create(this.#context)
			.withOptions(options)
			.run(licence);
	}
}
