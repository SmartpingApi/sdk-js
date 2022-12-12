import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export function createDate(datetime?: string, format?: string): Date {
	dayjs.extend(customParseFormat);

	if (datetime && format) {
		return dayjs(datetime, format).toDate();
	}

	if (datetime) {
		return dayjs(datetime).toDate();
	}

	return dayjs().toDate();
}
