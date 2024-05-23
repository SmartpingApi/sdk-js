import { assert, describe, expect, it } from 'vitest';

import { SmartpingGame } from '#src/models/player/game.js';
import { SmartpingRankedGame } from '#src/models/player/ranked_game.js';
import { SmartpingSPIDGame } from '#src/models/player/spid_game.js';
import { smartping } from '#tests/setup.js';

describe('get historic of games of players', () => {
	it('should find a list of past games for a specific licence', async () => {
		const ranked = new SmartpingRankedGame({
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

		const spid = new SmartpingSPIDGame({
			date: '16/03/2024',
			nom: 'REGNEAULT Johann',
			classement: '1361',
			epreuve: 'FED_Championnat de France par Equipes Masculin',
			victoire: 'D',
			forfait: '0',
			coefchamp: '1',
			idpartie: '6738624',
		});

		const expected = new SmartpingGame(ranked, spid);

		const response = await smartping.players.getGameHistory('1610533');
		expect(response).toHaveLength(30);

		const player = response[0];
		expect(player).toBeInstanceOf(SmartpingGame);
		assert.deepStrictEqual(player?.serialize(), expected.serialize());
	});
});
