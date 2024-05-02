import { expect, it } from 'vitest';

import { SmartpingClub } from '#src/models/club/club';

import { findClubsByPostalCode, findClubsByCity, findClubsByDepartment } from './find_by_location.js';

it('should find clubs by department', async () => {
	const response = await findClubsByDepartment(16);
	expect(response).toHaveLength(32);
	expect(response[0]).toBeInstanceOf(SmartpingClub);
});

it('should find clubs by city', async () => {
	const response = await findClubsByPostalCode('16120');
	expect(response).toHaveLength(1);
	expect(response[0]).toBeInstanceOf(SmartpingClub);
	expect(response[0]?.id).toBe(20160051);
});

it('should find clubs by postal code', async () => {
	const response = await findClubsByCity('Chateauneuf');
	expect(response).toHaveLength(6);
	expect(response[0]).toBeInstanceOf(SmartpingClub);
});
