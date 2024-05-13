import { mergeRankedAndSPIDPlayerCollection } from '#src/helpers/collections.js';
import Query from '#src/helpers/query.js';
import { FindPlayersByClubOnRankingBase } from '#src/queries/players/ranking_base/find_by_club.js';
import { FindPlayersByClubOnSpidBase } from '#src/queries/players/spid_base/find_by_club.js';
import type { SmartpingContext } from '#src/smartping.js';

export class FindPlayersByClub extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(clubCode: string, valid = false) {
		const [rankedResponse, spidResponse] = await Promise.all([
			FindPlayersByClubOnRankingBase.create(this.context).run(clubCode),
			FindPlayersByClubOnSpidBase.create(this.context).run(clubCode, valid),
		]);

		return mergeRankedAndSPIDPlayerCollection(rankedResponse, spidResponse);
	}
}
