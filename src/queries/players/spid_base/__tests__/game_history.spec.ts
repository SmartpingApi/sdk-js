import { assert, describe, expect, it } from 'vitest';

import { SmartpingSPIDGame } from '#src/models/player/spid_game.js';
import { smartping } from '#tests/setup.js';

describe('get historic of games of SPID players', () => {
	it('should find a list of past games for a specific licence', async () => {
		const expected = new SmartpingSPIDGame({
			date: '16/03/2024',
			nom: 'REGNEAULT Johann',
			classement: '1361',
			epreuve: 'FED_Championnat de France par Equipes Masculin',
			victoire: 'D',
			forfait: '0',
			coefchamp: '1',
			idpartie: '6738624',
		});

		const response = await smartping.players.spidBase.getGameHistory('1610533');
		expect(response).toHaveLength(30);

		const player = response[0];
		expect(player).toBeInstanceOf(SmartpingSPIDGame);
		assert.deepStrictEqual(player?.serialize(), expected.serialize());
	});
});
