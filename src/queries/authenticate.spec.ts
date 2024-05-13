import { describe, expect, it } from 'vitest';

import { SmartpingInitialization } from '#src/models/common/initialization.js';
import { smartping, smartpingWithBadCredentials } from '#tests/setup.js';

describe('Authentication', () => {
	it('should authenticate the application with correct credentials', async () => {
		const response = await smartping.authenticate();
		expect(response).toBeInstanceOf(SmartpingInitialization);
		expect(response?.authorized).toBe(true);
	});

	it('should not authenticate the application with incorrect credentials', async () => {
		const response = await smartpingWithBadCredentials.authenticate();
		expect(response).toBeUndefined();
	});
});
