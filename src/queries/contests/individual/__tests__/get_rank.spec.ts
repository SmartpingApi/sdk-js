import { assert, describe, expect, it } from 'vitest';

import { SmartpingIndividualContestRank } from '#src/models/contest/individual/individual_contest_rank.js';
import { smartping } from '#tests/setup.js';

describe('search rankings for individual contest', () => {
	it('should find a list of games for a given division', async () => {
		const expected = new SmartpingIndividualContestRank(
			{
				clt: 'N183 - 2583',
				club: 'NANTES TENNIS DE TABLE',
				nom: 'PIETROPAOLI',
				points: 'A',
				rang: '1',
			},
			smartping.context,
		);

		const response = await smartping.contests.individual.getRank(1, 109979);
		expect(response).toHaveLength(64);

		const organization = response[0];
		expect(organization).toBeInstanceOf(SmartpingIndividualContestRank);
		assert.deepStrictEqual(organization?.serialize(), expected.serialize());
	});
});
