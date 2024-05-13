import { it, expect, assert, describe } from 'vitest';

import { SmartpingClubTeam } from '#src/models/club/club_team.js';
import { smartping } from '#tests/setup.ts';

describe('search teams for a club', () => {
	const expected = new SmartpingClubTeam(
		{
			idepr: '11344',
			libepr: 'FED_Championnat de France par Equipes Masculin',
			idequipe: '11002',
			libequipe: 'Chateauneuf TTC 2 - Phase 1',
			libdivision: 'D16 - Division 1 - Ph 1 Poule 2',
			liendivision: 'cx_poule=655257&D1=125763&organisme_pere=131',
		},
		smartping.context,
	);

	it('should get all teams associated with a given club', async () => {
		const response = await smartping.clubs.getTeamsForClub('10160051', 'all');

		expect(response).toHaveLength(14);

		const team = response[0];
		expect(team).toBeInstanceOf(SmartpingClubTeam);
		assert.deepStrictEqual(team?.serialize(), expected.serialize());
	});

	it('should get women teams associated with a given club', async () => {
		const response = await smartping.clubs.getTeamsForClub('10160051', 'women');

		expect(response).toHaveLength(14);

		const team = response[0];
		expect(team).toBeInstanceOf(SmartpingClubTeam);
		assert.deepStrictEqual(team?.serialize(), expected.serialize());
	});

	it('should get men teams associated with a given club', async () => {
		const response = await smartping.clubs.getTeamsForClub('10160051', 'men');

		expect(response).toHaveLength(14);

		const team = response[0];
		expect(team).toBeInstanceOf(SmartpingClubTeam);
		assert.deepStrictEqual(team?.serialize(), expected.serialize());
	});

	it('should get all teams associated with a given club but not part of the national championship', async () => {
		const response = await smartping.clubs.getTeamsForClub('10160051', 'none');

		expect(response).toHaveLength(14);

		const team = response[0];
		expect(team).toBeInstanceOf(SmartpingClubTeam);
		assert.deepStrictEqual(team?.serialize(), expected.serialize());
	});
});
