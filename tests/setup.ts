import { beforeAll, beforeEach } from 'vitest';
import createSmartpingInstance from '@/smartping.js';
import env from './env.js';
import { purgeCache } from '@/helpers/cache.js';

beforeAll(() => {
	createSmartpingInstance(env.SMARTPING_APP_ID, env.SMARTPING_APP_KEY);
});

beforeEach(() => {
	purgeCache();
});
