import { assert, describe, expect, it } from 'vitest';

import { SmartpingRankedLicensee } from '#src/models/player/ranked_licensee.js';
import { smartping } from '#tests/setup.js';

describe('find ranked players by their licence', () => {
	it('should find a player for a given licence', async () => {
		const expected = new SmartpingRankedLicensee({
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

		const response = await smartping.players.rankingBase.getPlayer('1610533');
		expect(response).toBeInstanceOf(SmartpingRankedLicensee);
		assert.deepStrictEqual(response?.serialize(), expected.serialize());
	});
});
