import { assert, describe, expect, it } from 'vitest';

import { SmartpingIndividualContestGroup } from '#src/models/contest/individual/individual_contest_group.js';
import { smartping } from '#tests/setup.js';

describe('search groups for individual contest', () => {
	it('should find a list of games for a given division', async () => {
		const expected = new SmartpingIndividualContestGroup(
			{
				date: '10/04/2023',
				lien: 'epr=9007&res_division=109979&cx_tableau=117460',
				libelle: 'T1 Gr1',
			},
			smartping.context,
		);

		const response = await smartping.contests.individual.getGroups(1, 109979);
		expect(response).toHaveLength(1);

		const organization = response[0];
		expect(organization).toBeInstanceOf(SmartpingIndividualContestGroup);
		assert.deepStrictEqual(organization?.serialize(), expected.serialize());
	});
});
