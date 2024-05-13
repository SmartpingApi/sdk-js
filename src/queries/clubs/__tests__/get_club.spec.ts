import { it, assert, describe } from 'vitest';

import { SmartpingClubDetail } from '#src/models/club/club_detail.js';
import { smartping } from '#tests/setup.js';

describe('search club by its federation code', () => {
	it('should find a a club by its unique identifier', async ({ expect }) => {
		const expectedModel = new SmartpingClubDetail({
			idclub: '20160051',
			numero: '10160051',
			nom: 'Tennis de Table',
			nomsalle: 'Salle Omnisports',
			adressesalle1: 'Avenue de la Gare',
			adressesalle2: undefined,
			adressesalle3: undefined,
			codepsalle: '12345',
			villesalle: 'VILLE',
			web: 'https://example.com',
			nomcor: 'DUPONT',
			prenomcor: 'Jean',
			mailcor: 'contact@example.com',
			telcor: '0123456789',
			latitude: '45.123456',
			longitude: '-0.012345',
			validation: '01/01/2000',
		});

		const response = await smartping.clubs.findByCode('10160051');
		expect(response).toBeInstanceOf(SmartpingClubDetail);
		assert.deepStrictEqual(response?.serialize(), expectedModel?.serialize());
	});

	it('should return undefined if no club is found', async ({ expect }) => {
		const response = await smartping.clubs.findByCode('10160052');
		expect(response).toBeUndefined();
	});
});
