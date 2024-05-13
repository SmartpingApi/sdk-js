import { DateTime } from 'luxon';

export const dateFormats = {
	fr: 'dd/MM/yyyy',
	en: 'YYYY-MM-DD',
} as const;

export type DateFormat = keyof typeof dateFormats;

export function nonNullableDateFactory(format: DateFormat = 'fr') {
	return (value?: string) => {
		const date = createDate(value, dateFormats[format]);

		if (!date.isValid) {
			return DateTime.now();
		}

		return date;
	};
}

export function dateFactory(format: DateFormat = 'fr') {
	return (value?: string) => {
		const date = createDate(value, dateFormats[format]);

		if (!date.isValid) {
			return;
		}

		return date;
	};
}

export function createDate(datetime?: string, format?: string): DateTime {
	if (datetime && format) {
		return DateTime.fromFormat(datetime, format, { locale: 'fr' });
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
