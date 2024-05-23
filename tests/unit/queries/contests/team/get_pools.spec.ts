import { assert, describe, expect, it } from 'vitest';

import { SmartpingTeamPool } from '#src/models/contest/team/team_pool.js';
import { smartping } from '#tests/setup.js';

describe('search pools in division team contest', () => {
	it('should find initial position of the teams in a pool', async () => {
		const expected = new SmartpingTeamPool(
			{
				libelle: 'Poule 1',
				lien: 'cx_poule=657450&D1=126363',
			},
			smartping.context,
		);

		const response = await smartping.contests.team.getPools(126363);
		expect(response).toHaveLength(2);

		const first = response[0];
		expect(first).toBeInstanceOf(SmartpingTeamPool);
		assert.deepStrictEqual(first?.serialize(), expected.serialize());
	});
});
