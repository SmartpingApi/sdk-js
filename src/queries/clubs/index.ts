import type { QueryOptions } from '#src/helpers/query';
import { FindClubByCode } from '#src/queries/clubs/find_by_code';
import type { SmartpingContext } from '#src/smartping';

export default class ClubQueries {
	#context: SmartpingContext;

	constructor(context: SmartpingContext) {
		this.#context = context;
	}

	findByCode(code: string, options?: QueryOptions) {
		return FindClubByCode.create(this.#context).withOptions(options).run(code);
	}
}
