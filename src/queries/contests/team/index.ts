import type { QueryOptions } from '#src/helpers/query.js';
import type { ContestType } from '#src/models/contest/contest.js';
import type { TeamMatchLinkParameters } from '#src/models/contest/team/team_match.js';
import { FindDivisionsForContest } from '#src/queries/contests/team/get_divisions.js';
import { GetMatch } from '#src/queries/contests/team/get_match.js';
import { GetPoolInitialOrder } from '#src/queries/contests/team/get_pool_initial_order.js';
import { GetMatchesForPool } from '#src/queries/contests/team/get_pool_matches.js';
import { GetPoolRanking } from '#src/queries/contests/team/get_pool_ranking.js';
import { GetPoolsForDivision } from '#src/queries/contests/team/get_pools.js';
import type { SmartpingContext } from '#src/smartping.js';

export default class TeamContestQueries {
	#context: SmartpingContext;

	constructor(context: SmartpingContext) {
		this.#context = context;
	}

	getDivisions(organizationId: number, contestId: number, contestType: ContestType, options?: QueryOptions) {
		return FindDivisionsForContest.create(this.#context).withOptions(options).run(organizationId, contestId, contestType);
	}

	getMatch(matchId: number, extraParameters: TeamMatchLinkParameters, options?: QueryOptions) {
		return GetMatch.create(this.#context).withOptions(options).run(matchId, extraParameters);
	}

	getPoolInitialOrder(divisionId: number, poolId?: number, options?: QueryOptions) {
		return GetPoolInitialOrder.create(this.#context).withOptions(options).run(divisionId, poolId);
	}

	getPoolMatches(divisionId: number, poolId: number, options?: QueryOptions) {
		return GetMatchesForPool.create(this.#context).withOptions(options).run(divisionId, poolId);
	}

	getPoolRanking(divisionId: number, poolId: number, options?: QueryOptions) {
		return GetPoolRanking.create(this.#context).withOptions(options).run(divisionId, poolId);
	}

	getPools(divisionId: number, options?: QueryOptions) {
		return GetPoolsForDivision.create(this.#context).withOptions(options).run(divisionId);
	}
}
