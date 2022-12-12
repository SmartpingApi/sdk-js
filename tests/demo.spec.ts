import { expect, test } from 'vitest'
import SmartpingBrowserAPI from '../src/smartping-browser'
import Organization from '../src/models/organization/organization'

test('demo', async () => {
	const smartping = new SmartpingBrowserAPI('SW399', 'Sy2zMFb91P');
	const response = await smartping.findOrganizationsByType('L');
	console.log(response[0].normalize());
	expect(response.length).toBeGreaterThan(0);
	expect(response[0]).toBeInstanceOf(Organization);
});
