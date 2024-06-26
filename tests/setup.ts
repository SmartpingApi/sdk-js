import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';

import { Credentials } from '#src/credentials.js';
import { purgeCache } from '#src/helpers/cache.js';
import ConsoleReporter from '#src/reporters/console_reporter.js';
import { createSmartpingInstance } from '#src/smartping.js';
import { handlers } from '#tests/mocks/handlers.js';

const mockServer = setupServer(...handlers);

export const smartping = createSmartpingInstance({
	credentials: new Credentials(
		import.meta.env.VITE_SMARTPING_APP_ID,
		import.meta.env.VITE_SMARTPING_APP_KEY,
	),
	errorReporter: new ConsoleReporter(),
});

export const smartpingWithBadCredentials = createSmartpingInstance({
	credentials: new Credentials('bad_credential', 'bad_credential'),
	errorReporter: new ConsoleReporter(),
});

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }));

beforeEach(() => {
	purgeCache();
});

afterAll(() => mockServer.close());

afterEach(() => mockServer.resetHandlers());
