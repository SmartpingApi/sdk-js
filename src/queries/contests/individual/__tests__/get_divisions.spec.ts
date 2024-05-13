import { assert, describe, expect, it } from 'vitest';

import { SmartpingIndividualDivision } from '#src/models/contest/individual/individual_division.js';
import { smartping } from '#tests/setup.js';

describe('search divisions for individual contest', () => {
	it('should find a list of individual contest divisions', async () => {
		const expected = new SmartpingIndividualDivision({
			libelle: 'Juniors G (M)',
			iddivision: '18599',
		});

		const response = await smartping.contests.individual.getDivisions(1, 940);
		expect(response).toHaveLength(11);

		const organization = response[0];
		expect(organization).toBeInstanceOf(SmartpingIndividualDivision);
		assert.deepStrictEqual(organization?.serialize(), expected.serialize());
	});
});
