import { assert, describe, expect, it } from 'vitest';

import { SmartpingTeamPoolTeam } from '#src/models/contest/team/team_pool_team.js';
import { smartping } from '#tests/setup.js';

describe('search initial positions in pool for team contest', () => {
	it('should find initial position of the teams in a pool', async () => {
		const expected = new SmartpingTeamPoolTeam(
			{
				poule: '1',
				clt: '1',
				equipe: 'Tourriers J 1',
				joue: '7',
				pts: '9',
				numero: '10160013',
				totvic: '33',
				totdef: '65',
				idequipe: '13361',
				idclub: '20160013',
				vic: '1',
				def: '6',
				nul: '0',
				pf: '0',
				pg: '33',
				pp: '65',
			},
			smartping.context,
		);

		const response = await smartping.contests.team.getPoolInitialOrder(126363);
		expect(response).toHaveLength(8);

		const first = response[0];
		expect(first).toBeInstanceOf(SmartpingTeamPoolTeam);
		assert.deepStrictEqual(first?.serialize(), expected.serialize());
	});
});
