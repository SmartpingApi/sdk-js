import { assert, describe, expect, it } from 'vitest';

import { SmartpingPlayerRankHistory } from '#src/models/player/player_rank_history.js';
import { smartping } from '#tests/setup.js';

describe('get ranking history of players', () => {
	it('should find ranking history for a specific licence', async () => {
		const expected = new SmartpingPlayerRankHistory({
			echelon: 'N',
			place: '733',
			point: '2133',
			saison: 'Saison 2023 / 2024',
			phase: '2',
		});

		const response = await smartping.players.getRankHistory('1610533');
		expect(response).toHaveLength(30);

		const player = response.at(-1);
		expect(player).toBeInstanceOf(SmartpingPlayerRankHistory);
		assert.deepStrictEqual(player?.serialize(), expected.serialize());
	});
});
