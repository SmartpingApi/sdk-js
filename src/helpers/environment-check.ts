/* eslint-disable unicorn/no-null */
export function isBrowser(): boolean {
	return typeof window !== "undefined" && typeof window.document !== "undefined";
}

export function isNode(): boolean {
	return typeof process !== "undefined" &&
		process.versions != null &&
		process.versions.node != null;
}

export function isWebWorker(): boolean {
	return typeof self === "object" &&
		self.constructor &&
		self.constructor.name === "DedicatedWorkerGlobalScope";
}

export function isJsDom(): boolean {
	return (typeof window !== "undefined" && window.name === "nodejs") ||
		(typeof navigator !== "undefined" &&
			(navigator.userAgent.includes("Node.js") ||
				navigator.userAgent.includes("jsdom")));
}
