import type { QueryOptions } from '#src/helpers/query.js';
import { FindClubsByCity } from '#src/queries/clubs/find_by_city.js';
import { FindClubByCode } from '#src/queries/clubs/find_by_code.js';
import { FindClubsByDepartment } from '#src/queries/clubs/find_by_department.js';
import { FindClubsByName } from '#src/queries/clubs/find_by_name.js';
import { FindClubsByPostalCode } from '#src/queries/clubs/find_by_postal_code.js';
import { GetTeamsForClub, TeamTypes } from '#src/queries/clubs/get_teams.js';
import type { SmartpingContext } from '#src/smartping.js';
import type { ValueOf } from '#src/types/index.ts';

export default class ClubQueries {
	#context: SmartpingContext;

	constructor(context: SmartpingContext) {
		this.#context = context;
	}

	findByCity(city: string, options?: QueryOptions) {
		return FindClubsByCity.create(this.#context).withOptions(options).run(city);
	}

	findByCode(code: string, options?: QueryOptions) {
		return FindClubByCode.create(this.#context).withOptions(options).run(code);
	}

	findByDepartment(department: string, options?: QueryOptions) {
		return FindClubsByDepartment.create(this.#context).withOptions(options).run(department);
	}

	findByName(name: string, options?: QueryOptions) {
		return FindClubsByName.create(this.#context).withOptions(options).run(name);
	}

	findByPostalCode(postalCode: string, options?: QueryOptions) {
		return FindClubsByPostalCode.create(this.#context).withOptions(options).run(postalCode);
	}

	getTeamsForClub(clubCode: string, teamType: ValueOf<typeof TeamTypes>, options?: QueryOptions) {
		return GetTeamsForClub.create(this.#context).withOptions(options).run(clubCode, teamType);
	}
}
