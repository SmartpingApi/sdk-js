import { expect, it } from 'vitest';
import { authenticate } from './authenticate.js';
import { SmartpingInitialization } from '@/models/index.js';

it('should authenticate the application with correct credentials', async () => {
	const response = await authenticate();
	expect(response).toBeInstanceOf(SmartpingInitialization);
	expect(response?.authorized).toBe(true);
});
