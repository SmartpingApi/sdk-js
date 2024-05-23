import { assert, describe, expect, it } from 'vitest';

import { SmartpingTeamDivision } from '#src/models/contest/team/team_division.js';
import { smartping } from '#tests/setup.js';

describe('search divisions for team contest', () => {
	it('should find a list of individual contest divisions', async () => {
		const expected = new SmartpingTeamDivision(
			{
				libelle: 'Juniors G (M)',
				iddivision: '18599',
			},
			smartping.context,
		);

		const response = await smartping.contests.team.getDivisions(1, 940);
		expect(response).toHaveLength(11);

		const organization = response[0];
		expect(organization).toBeInstanceOf(SmartpingTeamDivision);
		assert.deepStrictEqual(organization?.serialize(), expected.serialize());
	});
});
