import type { QueryOptions } from '#src/helpers/query.js';
import type { ContestType } from '#src/models/contest/contest.js';
import { FindContests } from '#src/queries/contests/find_contests.js';
import IndividualContestQueries from '#src/queries/contests/individual/index.js';
import TeamContestQueries from '#src/queries/contests/team/index.js';
import type { SmartpingContext } from '#src/smartping.js';

export default class ContestQueries {
	#context: SmartpingContext;
	readonly #team: TeamContestQueries;
	readonly #individual: IndividualContestQueries;

	constructor(context: SmartpingContext) {
		this.#context = context;
		this.#team = new TeamContestQueries(context);
		this.#individual = new IndividualContestQueries(context);
	}

	findContests(organizationId: number, contestType: ContestType, options?: QueryOptions) {
		return FindContests.create(this.#context).withOptions(options).run(organizationId, contestType);
	}

	get team() {
		return this.#team;
	}

	get individual() {
		return this.#individual;
	}
}
