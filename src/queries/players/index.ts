import type { QueryOptions } from '#src/helpers/query.js';
import { FindPlayersByClub } from '#src/queries/players/find_by_club.js';
import { GetPlayer } from '#src/queries/players/find_by_licence.js';
import { FindPlayersByName } from '#src/queries/players/find_by_name.js';
import { GetPlayerGameHistory } from '#src/queries/players/game_history.js';
import { GetPlayerDetails } from '#src/queries/players/get_player_details.js';
import { GetPlayerRankHistory } from '#src/queries/players/rank_history.js';
import PlayerRankingBaseQueries from '#src/queries/players/ranking_base/index.js';
import PlayerSpidBaseQueries from '#src/queries/players/spid_base/index.js';
import type { SmartpingContext } from '#src/smartping.js';

export default class PlayerQueries {
	#context: SmartpingContext;
	readonly #spidBase: PlayerSpidBaseQueries;
	readonly #rankingBase: PlayerRankingBaseQueries;

	constructor(context: SmartpingContext) {
		this.#context = context;
		this.#spidBase = new PlayerSpidBaseQueries(context);
		this.#rankingBase = new PlayerRankingBaseQueries(context);
	}

	get spidBase() {
		return this.#spidBase;
	}

	get rankingBase() {
		return this.#rankingBase;
	}

	findByClub(clubCode: string, valid = false, options?: QueryOptions) {
		return FindPlayersByClub.create(this.#context).withOptions(options).run(clubCode, valid);
	}

	getPlayer(licence: string, options?: QueryOptions) {
		return GetPlayer.create(this.#context).withOptions(options).run(licence);
	}

	findByName(lastname: string, firstname?: string, valid = false, options?: QueryOptions) {
		return FindPlayersByName.create(this.#context)
			.withOptions(options)
			.run(lastname, firstname, valid);
	}

	getGameHistory(licence: string, options?: QueryOptions) {
		return GetPlayerGameHistory.create(this.#context).withOptions(options).run(licence);
	}

	getPlayerDetails(licence: string, options?: QueryOptions) {
		return GetPlayerDetails.create(this.#context).withOptions(options).run(licence);
	}

	getRankHistory(licence: string, options?: QueryOptions) {
		return GetPlayerRankHistory.create(this.#context).withOptions(options).run(licence);
	}
}
