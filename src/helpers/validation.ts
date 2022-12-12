export function isEmpty(value: unknown): boolean {
	return value === undefined || value === null || value === '';
}

export function stringifyDate(date?: Date): string|undefined {
	if (date) {
		return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
	}
	return undefined;
}
