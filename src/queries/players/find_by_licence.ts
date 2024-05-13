import Query from '#src/helpers/query.js';
import { SmartpingLicensee } from '#src/models/player/licensee.js';
import { GetPlayerOnRankingBase } from '#src/queries/players/ranking_base/find_by_licence.js';
import { GetPlayerOnSpidBase } from '#src/queries/players/spid_base/find_by_licence.js';
import type { SmartpingContext } from '#src/smartping.js';

export class GetPlayer extends Query {
	constructor(private context: SmartpingContext) {
		super(context);
	}

	static create(context: SmartpingContext) {
		return new this(context);
	}

	async run(licence: string) {
		const [rankedResponse, spidResponse] = await Promise.all([
			GetPlayerOnRankingBase.create(this.context).run(licence),
			GetPlayerOnSpidBase.create(this.context).run(licence),
		]);

		return new SmartpingLicensee(rankedResponse, spidResponse);
	}
}
