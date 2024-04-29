import { it, expect } from 'vitest';
import { getClub } from './find_by_code.js';
import { SmartpingClubDetail } from '@/models/index.js';

it('should find a a club by its unique identifier', async () => {
	const response = await getClub('10160051');
	expect(response).toBeInstanceOf(SmartpingClubDetail);
	expect(response?.id).toBe(20160051);
});
