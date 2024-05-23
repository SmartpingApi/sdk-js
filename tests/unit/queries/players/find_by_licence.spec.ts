import { assert, describe, expect, it } from 'vitest';

import { SmartpingLicensee } from '#src/models/player/licensee.js';
import { SmartpingRankedLicensee } from '#src/models/player/ranked_licensee.js';
import { SmartpingSPIDLicensee } from '#src/models/player/spid_licensee.js';
import { smartping } from '#tests/setup.js';

describe('find players by their licence', () => {
	it('should find a player for a given licence', async () => {
		const ranked = new SmartpingRankedLicensee({
			licence: '1610533',
			nom: 'DEVAUX',
			prenom: 'Aurelien',
			club: 'Chateauneuf TT Castelnovi',
			nclub: '10160051',
			natio: '',
			clglob: '15087',
			point: '1159.16015625',
			aclglob: '15095',
			apoint: '1155.16',
			clast: '11',
			clnat: '14590',
			categ: 'S',
			rangreg: '1191',
			rangdep: '101',
			valcla: '1118',
			clpro: '11',
			valinit: '1122',
		});

		const spid = new SmartpingSPIDLicensee({
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

		const expected = new SmartpingLicensee(ranked, spid);

		const response = await smartping.players.getPlayer('1610533');
		expect(response).toBeInstanceOf(SmartpingLicensee);
		assert.deepStrictEqual(response?.serialize(), expected.serialize());
	});
});
