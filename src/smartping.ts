
import ky from 'ky';

import { Credentials } from '#src/credentials.js';
import ClubQueries from '#src/queries/clubs/index.js';
import type ErrorReporter from '#src/reporters/error_reporter.js';
import VoidReporter from '#src/reporters/void_reporter.js';
import type { SerializerInterface } from '#src/serializers/serializer_interface.js';
import XmlSerializer from '#src/serializers/xml_serializer.js';

export interface SmartpingContext {
	credentials: Credentials;
	errorReporter: ErrorReporter;
	fetcher: typeof ky;
	serializer: SerializerInterface;
}

export interface SmartpingOptions {
	credentials: Credentials;
	errorReporter?: ErrorReporter;
	fetcher?: typeof ky;
}

export class Smartping {
	readonly #context: SmartpingContext;
	readonly #clubs: ClubQueries;

	constructor (options: SmartpingOptions) {
		this.#context = {
			credentials: options.credentials,
			errorReporter: options.errorReporter ?? new VoidReporter(),
			fetcher: options.fetcher ?? ky,
			serializer: new XmlSerializer(),
		};
		this.#clubs = new ClubQueries(this.#context);
	}

	get clubs() {
		return this.#clubs;
	}
}

export default function createSmartpingInstance(options: SmartpingOptions) {
	return new Smartping(options);
}
