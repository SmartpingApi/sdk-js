import cryptoRandomString from 'crypto-random-string';

export class Credentials {
	static #appId: string;
	static #appKey: string;
	static #serial = cryptoRandomString({ length: 15 });
	static #baseUrl = 'https://apiv2.fftt.com/mobile/pxml';

	public static setCredentials(appId: string, appKey: string): void {
		this.#appId = appId;
		this.#appKey = appKey;
	}

	public static get appId(): string {
		return this.#appId;
	}

	public static get appKey(): string {
		return this.#appKey;
	}

	public static get serial(): string {
		return this.#serial;
	}

	public static get baseUrl(): string {
		return this.#baseUrl;
	}
}
