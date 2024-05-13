import { assert, describe, expect, it } from 'vitest';

import { SmartpingSPIDLicensee } from '#src/models/player/spid_licensee.js';
import { smartping } from '#tests/setup.js';

describe('find SPID players by their licence', () => {
	it('should find a player for a given licence', async () => {
		const expected = new SmartpingSPIDLicensee({
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
			cat: 'Seniors',
		});

		const response = await smartping.players.spidBase.getPlayer('1610533');
		expect(response).toBeInstanceOf(SmartpingSPIDLicensee);
		assert.deepStrictEqual(response?.serialize(), expected.serialize());
	});
});
