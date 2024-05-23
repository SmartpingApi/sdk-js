import { assert, describe, expect, it } from 'vitest';

import { SmartpingFederalCriteriumRank } from '#src/models/contest/individual/federal_criterium_rank.js';
import { smartping } from '#tests/setup.js';

describe('federal criterium', () => {
	it('should find a ranking of a given federal criterium', async () => {
		const expected = new SmartpingFederalCriteriumRank(
			{
				rang: '1',
				nom: 'BAHUAUD Mathieu',
				clt: '1953',
				club: 'ROMAGNE (LA) - S.S.',
				points: '1900A',
			},
			smartping.context,
		);

		const response = await smartping.contests.individual.getFederalCriteriumRank(123915);
		expect(response).toHaveLength(39);

		const organization = response[0];
		expect(organization).toBeInstanceOf(SmartpingFederalCriteriumRank);
		assert.deepStrictEqual(organization?.serialize(), expected.serialize());
	});
});
