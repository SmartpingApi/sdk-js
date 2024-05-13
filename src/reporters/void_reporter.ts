import type ErrorReporter from '#src/reporters/error_reporter.js';

export default class VoidReporter implements ErrorReporter {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	report() {
		return void 0;
	}
}
