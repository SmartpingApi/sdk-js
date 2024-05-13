import { assert, describe, expect, it } from 'vitest';

import { SmartpingClub } from '#src/models/club/club.js';
import { smartping } from '#tests/setup.js';

describe('search clubs by name', () => {
	it('should find a club by its name', async () => {
		const expected = new SmartpingClub(
			{
				idclub: '3330035',
				numero: '10330035',
				nom: 'CLUB_TROUVE_1',
				typeclub: 'L',
				validation: '01/07/2023',
			},
			smartping.context,
		);

		const response = await smartping.clubs.findByName('castelnovien');
		expect(response).toHaveLength(3);

		const club = response[0];
		expect(club).toBeInstanceOf(SmartpingClub);
		assert.deepStrictEqual(club?.serialize(), expected.serialize());
	});

	it('should return an empty array if no club is found', async () => {
		const response = await smartping.clubs.findByName('abcdef');
		expect(response).toHaveLength(0);
	});
});
