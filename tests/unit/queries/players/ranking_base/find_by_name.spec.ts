import { assert, describe, expect, it } from 'vitest';

import { SmartpingRankedPlayer } from '#src/models/player/ranked_player.js';
import { smartping } from '#tests/setup.js';

describe('find ranked players by their name', () => {
	it('should find a list of players for a given name', async () => {
		const expected = new SmartpingRankedPlayer({
			licence: '167376',
			nom: 'AGARD',
			prenom: 'Pascal',
			club: 'Chateauneuf TT Castelnovi',
			nclub: '10160051',
			clast: '8',
		});

		const response = await smartping.players.rankingBase.findByName('dupont');
		expect(response).toHaveLength(52);

		const player = response[0];
		expect(player).toBeInstanceOf(SmartpingRankedPlayer);
		assert.deepStrictEqual(player?.serialize(), expected.serialize());
	});
});
