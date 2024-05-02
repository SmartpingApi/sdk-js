import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';

import { Credentials } from '#src/credentials.js';
import { purgeCache } from '#src/helpers/cache.js';
import ConsoleReporter from '#src/reporters/console_reporter.js';
import createSmartpingInstance from '#src/smartping.js';
import env from '#tests/env.js';
import { handlers } from '#tests/mocks/handlers.js';

const mockServer = setupServer(...handlers);

export const smartping = createSmartpingInstance({
	credentials: new Credentials(env.SMARTPING_APP_ID, env.SMARTPING_APP_KEY),
	errorReporter: new ConsoleReporter(),
});

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }))

beforeEach(() => {
	purgeCache();
});

afterAll(() => mockServer.close())

afterEach(() => mockServer.resetHandlers())
