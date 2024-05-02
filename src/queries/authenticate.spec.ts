import { expect, it } from 'vitest';

import { SmartpingInitialization } from '#src/models/common/initialization';

import { authenticate } from './authenticate.js';

it('should authenticate the application with correct credentials', async () => {
	const response = await authenticate();
	expect(response).toBeInstanceOf(SmartpingInitialization);
	expect(response?.authorized).toBe(true);
});
