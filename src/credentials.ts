import cryptoRandomString from 'crypto-random-string';

export class Credentials {
	readonly #appId: string;
	readonly #appKey: string;
	readonly #serial: string;
	readonly #baseUrl: string;

	public constructor(appId: string, appKey: string) {
		this.#appId = appId;
		this.#appKey = appKey;
		this.#serial = cryptoRandomString({ length: 15 });
		this.#baseUrl = 'https://apiv2.fftt.com/mobile/pxml';
	}

	public get appId(): string {
		return this.#appId;
	}

	public get appKey(): string {
		return this.#appKey;
	}

	public get serial(): string {
		return this.#serial;
	}

	public get baseUrl(): string {
		return this.#baseUrl;
	}
}
