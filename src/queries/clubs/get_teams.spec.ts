import { it, expect } from 'vitest';
import { getTeamsForClub, TeamTypes } from './get_teams.js';
import { SmartpingClubTeam } from '@/models/index.js';

it('should get all teams associated with a given club', async () => {
	const response = await getTeamsForClub('10160051', TeamTypes.All);

	expect(response).toHaveLength(17);
	expect(response[0]).toBeInstanceOf(SmartpingClubTeam);
});

it('should get women teams associated with a given club', async () => {
	const response = await getTeamsForClub('10160051', TeamTypes.Women);

	expect(response).toHaveLength(14);
	expect(response[0]).toBeInstanceOf(SmartpingClubTeam);
});

it('should get men teams associated with a given club', async () => {
	const response = await getTeamsForClub('10160051', TeamTypes.Men);

	expect(response).toHaveLength(17);
	expect(response[0]).toBeInstanceOf(SmartpingClubTeam);
});

it('should get all teams associated with a given club but not part of the national championship', async () => {
	const response = await getTeamsForClub('10160051', TeamTypes.None);

	expect(response).toHaveLength(17);
	expect(response[0]).toBeInstanceOf(SmartpingClubTeam);
});
