export default class UnexpectedRootKeyError extends Error {
	constructor (rootKey: string, isArray: boolean, url: string) {
		super(`Unexpected root key: ${rootKey}. The request to ${url} resulted in an ${isArray ? 'array' : 'object'} which does not contains the root key specified`);
	}
}
