import type ErrorReporter from '#src/reporters/error_reporter.js';

export default class ConsoleReporter implements ErrorReporter {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	report(error: any) {
		console.error(error);
	}
}
