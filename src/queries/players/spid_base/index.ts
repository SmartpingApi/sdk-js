import type { QueryOptions } from '#src/helpers/query.js';
import { FindPlayersByClubOnSpidBase } from '#src/queries/players/spid_base/find_by_club.js';
import { GetPlayerOnSpidBase } from '#src/queries/players/spid_base/find_by_licence.js';
import { FindPlayersByNameOnSpidBase } from '#src/queries/players/spid_base/find_by_name.js';
import { GetPlayerGameHistoryOnSpidBase } from '#src/queries/players/spid_base/game_history.js';
import type { SmartpingContext } from '#src/smartping.js';

export default class PlayerSpidBaseQueries {
	#context: SmartpingContext;

	constructor(context: SmartpingContext) {
		this.#context = context;
	}

	findByClub(clubCode: string, valid = false, options?: QueryOptions) {
		return FindPlayersByClubOnSpidBase.create(this.#context)
			.withOptions(options)
			.run(clubCode, valid);
	}

	getPlayer(licence: string, options?: QueryOptions) {
		return GetPlayerOnSpidBase.create(this.#context).withOptions(options).run(licence);
	}

	findByName(lastname: string, firstname?: string, valid = false, options?: QueryOptions) {
		return FindPlayersByNameOnSpidBase.create(this.#context)
			.withOptions(options)
			.run(lastname, firstname, valid);
	}

	getGameHistory(licence: string, options?: QueryOptions) {
		return GetPlayerGameHistoryOnSpidBase.create(this.#context).withOptions(options).run(licence);
	}
}
