import { assert, describe, expect, it } from 'vitest';

import { SmartpingPlayerDetails } from '#src/models/player/player_details.js';
import { smartping } from '#tests/setup.js';

describe('get detailed informations about a player', () => {
	it('should find detailed informations for a specific licence', async () => {
		const expected = new SmartpingPlayerDetails({
			idlicence: '649948',
			licence: '1610533',
			nom: 'DEVAUX',
			prenom: 'Aurelien',
			numclub: '10160051',
			nomclub: 'Chateauneuf TT Castelnovien',
			sexe: 'M',
			type: 'T',
			certif: 'C',
			validation: '01/07/2023',
			echelon: '',
			place: '',
			point: '1118',
			cat: 'S',
			pointm: '1159.16015625',
			apointm: '1155.16',
			initm: '1122',
			mutation: '',
			natio: 'F',
			arb: 'AR',
			ja: 'JA2',
			tech: '',
		});

		const response = await smartping.players.getPlayerDetails('1610533');
		expect(response).toHaveLength(1);

		const player = response[0];
		expect(player).toBeInstanceOf(SmartpingPlayerDetails);
		assert.deepStrictEqual(player?.serialize(), expected.serialize());
	});
});
