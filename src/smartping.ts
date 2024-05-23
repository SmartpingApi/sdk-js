import ky from 'ky';

import { Credentials } from '#src/credentials.js';
import type { QueryOptions } from '#src/helpers/query.js';
import { Authenticate } from '#src/queries/authenticate.js';
import ClubQueries from '#src/queries/clubs/index.js';
import ContestQueries from '#src/queries/contests/index.js';
import { GetFederationNewsFeed } from '#src/queries/news_feed.js';
import OrganizationQueries from '#src/queries/organizations/index.js';
import PlayerQueries from '#src/queries/players/index.js';
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
	readonly #organizations: OrganizationQueries;
	readonly #players: PlayerQueries;
	readonly #contests: ContestQueries;

	constructor(options: SmartpingOptions) {
		this.#context = {
			credentials: options.credentials,
			errorReporter: options.errorReporter ?? new VoidReporter(),
			fetcher: options.fetcher ?? ky,
			serializer: new XmlSerializer(),
		};
		this.#clubs = new ClubQueries(this.#context);
		this.#organizations = new OrganizationQueries(this.#context);
		this.#players = new PlayerQueries(this.#context);
		this.#contests = new ContestQueries(this.#context);
	}

	get clubs() {
		return this.#clubs;
	}

	get organizations() {
		return this.#organizations;
	}

	get players() {
		return this.#players;
	}

	get contests() {
		return this.#contests;
	}

	get context() {
		return this.#context;
	}

	authenticate(options?: QueryOptions) {
		return Authenticate.create(this.#context).withOptions(options).run();
	}

	getFederationNewsFeed(options?: QueryOptions) {
		return GetFederationNewsFeed.create(this.#context).withOptions(options).run();
	}
}

export function createSmartpingInstance(options: SmartpingOptions) {
	return new Smartping(options);
}
