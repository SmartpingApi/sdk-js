import { assert, describe, expect, it } from 'vitest';

import { SmartpingOrganization } from '#src/models/organization/organization.js';
import { smartping } from '#tests/setup.js';

describe('search a specific organization', () => {
	it('should find an organizations', async () => {
		const expected = new SmartpingOrganization(
			{
				libelle: 'AUVERGNE-RHONE ALPES',
				id: '9',
				code: 'L01',
				idPere: '5',
			},
			smartping.context,
		);

		const response = await smartping.organizations.getOrganization('L01');
		expect(response).toBeInstanceOf(SmartpingOrganization);
		assert.deepStrictEqual(response?.serialize(), expected.serialize());
	});
});
