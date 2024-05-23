import { assert, describe, expect, it } from 'vitest';

import { SmartpingPlayer } from '#src/models/player/player.js';
import { SmartpingRankedPlayer } from '#src/models/player/ranked_player.js';
import { SmartpingSPIDPlayer } from '#src/models/player/spid_player.js';
import { smartping } from '#tests/setup.js';

describe('find players by their name', () => {
	it('should find a list of players for a given name', async () => {
		const ranked = new SmartpingRankedPlayer({
			licence: '167376',
			nom: 'AGARD',
			prenom: 'Pascal',
			club: 'Chateauneuf TT Castelnovi',
			nclub: '10160051',
			clast: '8',
		});

		const spid = new SmartpingSPIDPlayer({
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

		const expected = new SmartpingPlayer(ranked, spid);

		const response = await smartping.players.findByName('dupont');
		expect(response).toHaveLength(63);

		const player = response[0];
		expect(player).toBeInstanceOf(SmartpingPlayer);
		assert.deepStrictEqual(player?.serialize(), expected.serialize());
	});
});
