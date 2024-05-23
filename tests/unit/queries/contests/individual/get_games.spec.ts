import { assert, describe, expect, it } from 'vitest';

import { SmartpingIndividualContestGame } from '#src/models/contest/individual/individual_contest_game.js';
import { smartping } from '#tests/setup.js';

describe('search games for individual contest', () => {
	it('should find a list of games for a given division', async () => {
		const expected = new SmartpingIndividualContestGame({
			libelle: 'Finale',
			vain: 'PIETROPAOLI Julien',
			perd: 'BLANQUART Jerome',
			forfait: '',
		});

		const response = await smartping.contests.individual.getGames(1, 109979);
		expect(response).toHaveLength(31);

		const organization = response[0];
		expect(organization).toBeInstanceOf(SmartpingIndividualContestGame);
		assert.deepStrictEqual(organization?.serialize(), expected.serialize());
	});
});
