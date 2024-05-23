import { assert, describe, expect, it } from 'vitest';

import { SmartpingTeamPoolTeam } from '#src/models/contest/team/team_pool_team.js';
import { smartping } from '#tests/setup.js';

describe('search rankings in pool for team contest', () => {
	it('should find rankings of the teams in a pool', async () => {
		const expected = new SmartpingTeamPoolTeam(
			{
				poule: '1',
				clt: '1',
				equipe: 'Torsac CP 1',
				joue: '7',
				pts: '21',
				numero: '10160226',
				totvic: '80',
				totdef: '18',
				idequipe: '8843',
				idclub: '40000196',
				vic: '7',
				def: '0',
				nul: '0',
				pf: '0',
				pg: '80',
				pp: '18',
			},
			smartping.context,
		);

		const response = await smartping.contests.team.getPoolRanking(126363, 123);
		expect(response).toHaveLength(8);

		const first = response[0];
		expect(first).toBeInstanceOf(SmartpingTeamPoolTeam);
		assert.deepStrictEqual(first?.serialize(), expected.serialize());
	});
});
