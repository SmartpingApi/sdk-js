import individualContests from './individual/index.js';
import teamContests from './team/index.js';
import { findContests } from './find_contests.js';

export default {
	find: findContests,
	team: teamContests,
	individual: individualContests,
};
