import { assert, describe, expect, it } from 'vitest';

import { SmartpingDivision } from '#src/models/contest/division.js';
import { smartping } from '#tests/setup.js';

describe('search divisions for contest', () => {
	it('should find a list of contest divisions', async () => {
		const expected = new SmartpingDivision({
			libelle: 'Juniors G (M)',
			iddivision: '18599',
		});

		const response = await smartping.contests.findDivisionsForContest(1, 940, 'individual');
		expect(response).toHaveLength(11);

		const organization = response[0];
		expect(organization).toBeInstanceOf(SmartpingDivision);
		assert.deepStrictEqual(organization?.serialize(), expected.serialize());
	});
});
