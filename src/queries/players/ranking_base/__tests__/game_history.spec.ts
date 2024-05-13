import { assert, describe, expect, it } from 'vitest';

import { SmartpingRankedGame } from '#src/models/player/ranked_game.js';
import { smartping } from '#tests/setup.js';

describe('get historic of games of ranked players', () => {
	it('should find a list of past games for a specific licence', async () => {
		const expected = new SmartpingRankedGame({
			licence: '1610533',
			advlic: '1719227',
			vd: 'D',
			numjourn: '17',
			codechamp: '1',
			date: '16/03/2024',
			advsexe: 'M',
			advnompre: 'REGNEAULT Johann',
			pointres: '-1',
			coefchamp: '1',
			advclaof: '14',
			idpartie: '6738624',
		});

		const response = await smartping.players.rankingBase.getGameHistory('1610533');
		expect(response).toHaveLength(27);

		const player = response[0];
		expect(player).toBeInstanceOf(SmartpingRankedGame);
		assert.deepStrictEqual(player?.serialize(), expected.serialize());
	});
});
