import { findClubsByDepartment, findClubsByCity, findClubsByPostalCode } from './find_by_location.js';
import { getClub } from './find_by_code.js';
import { findClubsByName } from './find_by_name.js';
import { getTeamsForClub } from './get_teams.js';

export default {
	findBy: {
		department: findClubsByDepartment,
		city: findClubsByCity,
		postalCode: findClubsByPostalCode,
		name: findClubsByName,
	},
	get: getClub,
	getTeams: getTeamsForClub,
}

export { TeamTypes } from './get_teams.js';
