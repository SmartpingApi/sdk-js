import { assert, describe, expect, it } from 'vitest';

import { SmartpingRankedPlayer } from '#src/models/player/ranked_player.js';
import { smartping } from '#tests/setup.js';

describe('find ranked players by their club', () => {
	it('should find a list of players for a given club', async () => {
		const expected = new SmartpingRankedPlayer({
			licence: '167376',
			nom: 'AGARD',
			prenom: 'Pascal',
			club: 'Chateauneuf TT Castelnovi',
			nclub: '10160051',
			clast: '8',
		});

		const response = await smartping.players.rankingBase.findByClub('10160051');
		expect(response).toHaveLength(52);

		const player = response[0];
		expect(player).toBeInstanceOf(SmartpingRankedPlayer);
		assert.deepStrictEqual(player?.serialize(), expected.serialize());
	});
});
