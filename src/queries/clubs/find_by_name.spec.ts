import { expect, it } from 'vitest';
import { findClubsByName } from './find_by_name.js';
import { SmartpingClub } from '@/models/index.js';

it('should find a club by its name', async () => {
	const response = await findClubsByName('castelnovien');
	expect(response).toHaveLength(1);
	expect(response[0]).toBeInstanceOf(SmartpingClub);
});
