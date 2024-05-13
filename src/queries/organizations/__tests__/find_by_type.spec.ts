import { assert, describe, expect, it } from 'vitest';

import { SmartpingOrganization } from '#src/models/organization/organization.js';
import { smartping } from '#tests/setup.js';

describe('search organizations by type', () => {
	it('should find a list of organizations', async () => {
		const expected = new SmartpingOrganization(
			{
				libelle: 'AUVERGNE-RHONE ALPES',
				id: '9',
				code: 'L01',
				idPere: '5',
			},
			smartping.context,
		);

		const response = await smartping.organizations.findByType('league');
		expect(response).toHaveLength(21);

		const organization = response[0];
		expect(organization).toBeInstanceOf(SmartpingOrganization);
		assert.deepStrictEqual(organization?.serialize(), expected.serialize());
	});
});
