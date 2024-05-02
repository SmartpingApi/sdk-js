export default class UnexpectedApiResponseError extends Error {
	constructor () {
		super('Received items should be an array or a single object.');
	}
}
