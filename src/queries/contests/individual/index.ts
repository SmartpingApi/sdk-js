import type { QueryOptions } from '#src/helpers/query.js';
import { GetFederalCriteriumRankForDivision } from '#src/queries/contests/individual/federal_criterium_rank.js';
import { FindDivisionsForIndividualContest } from '#src/queries/contests/individual/get_divisions.js';
import { GetIndividualContestGames } from '#src/queries/contests/individual/get_games.js';
import { GetIndividualContestGroups } from '#src/queries/contests/individual/get_groups.js';
import { GetIndividualContestRank } from '#src/queries/contests/individual/get_rank.js';
import type { SmartpingContext } from '#src/smartping.js';

export default class IndividualContestQueries {
	#context: SmartpingContext;

	constructor(context: SmartpingContext) {
		this.#context = context;
	}

	getDivisions(organizationId: number, contestId: number, options?: QueryOptions) {
		return FindDivisionsForIndividualContest.create(this.#context)
			.withOptions(options)
			.run(organizationId, contestId);
	}

	getFederalCriteriumRank(divisionId: number, options?: QueryOptions) {
		return GetFederalCriteriumRankForDivision.create(this.#context)
			.withOptions(options)
			.run(divisionId);
	}

	getGames(contestId: number, divisionId: number, groupId?: number, options?: QueryOptions) {
		return GetIndividualContestGames.create(this.#context)
			.withOptions(options)
			.run(contestId, divisionId, groupId);
	}

	getGroups(contestId: number, divisionId: number, options?: QueryOptions) {
		return GetIndividualContestGroups.create(this.#context)
			.withOptions(options)
			.run(contestId, divisionId);
	}

	getRank(contestId: number, divisionId: number, groupId?: number, options?: QueryOptions) {
		return GetIndividualContestRank.create(this.#context)
			.withOptions(options)
			.run(contestId, divisionId, groupId);
	}
}
