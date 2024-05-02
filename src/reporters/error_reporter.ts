export default interface ErrorReporter {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	report(error: any): void;
}
