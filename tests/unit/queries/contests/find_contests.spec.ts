import { assert, describe, expect, it } from 'vitest';

import { SmartpingContest } from '#src/models/contest/contest.js';
import { smartping } from '#tests/setup.js';

describe('search contests', () => {
	it('should find a list of contests', async () => {
		const expected = new SmartpingContest(
			{
				idepreuve: '256',
				idorga: '1',
				libelle: 'LIBELLE_EPREUVE',
				typepreuve: 'C',
			},
			smartping.context,
		);

		const response = await smartping.contests.findContests(131, 'team');
		expect(response).toHaveLength(73);

		const organization = response[0];
		expect(organization).toBeInstanceOf(SmartpingContest);
		assert.deepStrictEqual(organization?.serialize(), expected.serialize());
	});
});
