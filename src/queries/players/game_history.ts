import { mergeRankingAndSPIDGameHistoryCollection } from '#src/helpers/collections.js';
import Query from '#src/helpers/query.js';
import { GetPlayerGameHistoryOnRankingBase } from '#src/queries/players/ranking_base/game_history.js';
import { GetPlayerGameHistoryOnSpidBase } from '#src/queries/players/spid_base/game_history.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPlayerGameHistory extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(licence: string) {
		const [rankedResponse, spidResponse] = await Promise.all([
			GetPlayerGameHistoryOnRankingBase.create(this.context).run(licence),
			GetPlayerGameHistoryOnSpidBase.create(this.context).run(licence),
		]);

		return mergeRankingAndSPIDGameHistoryCollection(rankedResponse, spidResponse);
	}
}
