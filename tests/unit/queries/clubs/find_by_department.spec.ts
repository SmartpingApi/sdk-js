import { assert, describe, expect, it } from 'vitest';

import { SmartpingClub } from '#src/models/club/club.js';
import { smartping } from '#tests/setup.js';

describe('search clubs by department', () => {
	it('should find clubs in a department', async () => {
		const expected = new SmartpingClub(
			{
				idclub: '40002275',
				numero: '369G0032',
				nom: 'ASPTT MAYOTTE MTSANGAMOUJI',
				validation: '01/09/2023',
				typeclub: 'L',
			},
			smartping.context,
		);

		const response = await smartping.clubs.findByDepartment('16');
		expect(response).toHaveLength(9);

		const club = response[0];
		expect(club).toBeInstanceOf(SmartpingClub);
		assert.deepStrictEqual(club?.serialize(), expected.serialize());
	});

	it('should return an empty array if no club is found', async () => {
		const response = await smartping.clubs.findByDepartment('98');
		expect(response).toHaveLength(0);
	});
});
