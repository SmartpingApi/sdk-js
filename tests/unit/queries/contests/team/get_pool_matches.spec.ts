import { assert, describe, expect, it } from 'vitest';

import { SmartpingTeamMatch } from '#src/models/contest/team/team_match.js';
import { smartping } from '#tests/setup.js';

describe('search matches in pool for team contest', () => {
	it('should find a list of matches', async () => {
		const expected = new SmartpingTeamMatch(
			{
				datereelle: '19/01/2024',
				dateprevue: '19/01/2024',
				equa: 'Tourriers J 1',
				equb: 'La Rochefouc. 1',
				lien: 'renc_id=2920408&is_retour=0&phase=2&res_1=4&res_2=10&equip_1=Tourriers+J+1&equip_2=La+Rochefouc.+1&equip_id1=13361&equip_id2=10994&clubnum_1=10160013&clubnum_2=10160232',
				libelle: 'Poule 1 - tour n\u22181 du 19/01/2024',
				scorea: '4',
				scoreb: '10',
			},
			smartping.context,
		);

		const response = await smartping.contests.team.getPoolMatches(126363, 123);
		expect(response).toHaveLength(28);

		const first = response[0];
		expect(first).toBeInstanceOf(SmartpingTeamMatch);
		assert.deepStrictEqual(first?.serialize(), expected.serialize());
	});
});
