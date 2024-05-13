import { assert, describe, expect, it } from 'vitest';

import { SmartpingSPIDPlayer } from '#src/models/player/spid_player.js';
import { smartping } from '#tests/setup.js';

describe('find SPID players by their club', () => {
	it('should find a list of players for a given club', async () => {
		const expected = new SmartpingSPIDPlayer({
			licence: '167376',
			nom: 'AGARD',
			prenom: 'Pascal',
			club: '10160051',
			nclub: 'Chateauneuf TT Castelnovien',
			sexe: 'M',
			points: '764',
			echelon: '',
			place: '',
		});

		const response = await smartping.players.spidBase.findByClub('10160051');
		expect(response).toHaveLength(63);

		const player = response[0];
		expect(player).toBeInstanceOf(SmartpingSPIDPlayer);
		assert.deepStrictEqual(player?.serialize(), expected.serialize());
	});
});
