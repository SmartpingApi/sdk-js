import { mergeRankedAndSPIDPlayerCollection } from '#src/helpers/collections.js';
import Query from '#src/helpers/query.js';
import { FindPlayersByNameOnRankingBase } from '#src/queries/players/ranking_base/find_by_name.js';
import { FindPlayersByNameOnSpidBase } from '#src/queries/players/spid_base/find_by_name.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindPlayersByName extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(lastname: string, firstname?: string, valid = false) {
		const [rankedResponse, spidResponse] = await Promise.all([
			FindPlayersByNameOnRankingBase.create(this.context).run(lastname, firstname),
			FindPlayersByNameOnSpidBase.create(this.context).run(lastname, firstname, valid),
		]);

		return mergeRankedAndSPIDPlayerCollection(rankedResponse, spidResponse);
	}
}
