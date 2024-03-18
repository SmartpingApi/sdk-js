import { DateTime } from 'luxon';

export function createDate(datetime?: string, format?: string): DateTime {
	if (datetime && format) {
		return DateTime.fromFormat(datetime, format);
	}

	if (datetime) {
		return DateTime.fromRFC2822(datetime);
	}

	return DateTime.now();
}

export function stringifyDate(date?: DateTime) {
	if (undefined === date) {
		return;
	}

	return date.toLocaleString(DateTime.DATE_SHORT, { locale: 'fr' });
}
