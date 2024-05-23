import { assert, describe, expect, it } from 'vitest';

import { SmartpingTeamMatchDetails } from '#src/models/contest/team/team_match_details.js';
import { smartping } from '#tests/setup.js';

describe('search matches for team contest', () => {
	it('should find a specific team match', async () => {
		const expected = new SmartpingTeamMatchDetails(
			{
				extras: {
					clubACode: '',
					clubBCode: '',
					matchId: 2920408,
					phase: 1,
					teamAId: 0,
					teamBId: 0,
				},
				joueur: [
					{ xja: 'EQA_JOUEUR_1', xca: 'M 999pts', xjb: 'EQB_JOUEUR_1', xcb: 'M 999pts' },
					{ xja: 'EQA_JOUEUR_2', xca: 'F 999pts', xjb: 'EQB_JOUEUR_2', xcb: 'F 999pts' },
					{ xja: 'EQA_JOUEUR_3', xca: 'M 999pts', xjb: 'EQB_JOUEUR_3', xcb: 'M 999pts' },
					{ xja: 'EQA_JOUEUR_4', xca: 'M 999pts', xjb: 'EQB_JOUEUR_4', xcb: 'M 999pts' },
				],
				partie: [
					{
						ja: 'EQA_JOUEUR_1',
						scorea: '-',
						jb: 'EQB_JOUEUR_1',
						scoreb: '1',
						detail: '-06 -03 -09',
					},
					{
						ja: 'EQA_JOUEUR_2',
						scorea: '-',
						jb: 'EQB_JOUEUR_2',
						scoreb: '1',
						detail: '04 -09 -05 -03',
					},
					{
						ja: 'EQA_JOUEUR_3',
						scorea: '1',
						jb: 'EQB_JOUEUR_3',
						scoreb: '-',
						detail: '09 -08 -05 09 08',
					},
					{
						ja: 'EQB_JOUEUR_4',
						scorea: '-',
						jb: 'EQB_JOUEUR_4',
						scoreb: '1',
						detail: '-07 -05 08 -05',
					},
					{
						ja: 'EQA_JOUEUR_1',
						scorea: '-',
						jb: 'EQB_JOUEUR_2',
						scoreb: '1',
						detail: '-07 -10 -06',
					},
					{
						ja: 'EQA_JOUEUR_2',
						scorea: '-',
						jb: 'EQB_JOUEUR_1',
						scoreb: '1',
						detail: '-10 05 -05 -04',
					},
					{
						ja: 'EQB_JOUEUR_4',
						scorea: '1',
						jb: 'EQB_JOUEUR_3',
						scoreb: '-',
						detail: '07 08 -06 10',
					},
					{ ja: 'EQA_JOUEUR_3', scorea: '1', jb: 'EQB_JOUEUR_4', scoreb: '-', detail: '09 10 11' },
					{
						ja: 'EQA_JOUEUR_2 et EQB_JOUEUR_4',
						scorea: '1',
						jb: 'EQB_JOUEUR_2 et EQB_JOUEUR_4',
						scoreb: '-',
						detail: '-07 05 06 08',
					},
					{
						ja: 'EQA_JOUEUR_1 et EQA_JOUEUR_3',
						scorea: '-',
						jb: 'EQB_JOUEUR_1 et EQB_JOUEUR_3',
						scoreb: '1',
						detail: '08 -06 -05 06 -03',
					},
					{
						ja: 'EQA_JOUEUR_1',
						scorea: '-',
						jb: 'EQB_JOUEUR_3',
						scoreb: '1',
						detail: '-07 -09 -03',
					},
				],
				resultat: {
					equa: 'EQUIPE_A',
					equb: 'EQUIPE_B',
					resa: '4',
					resb: '10',
				},
			},
			smartping.context,
		);

		const response = await smartping.contests.team.getMatch(2920408);
		expect(response).toBeInstanceOf(SmartpingTeamMatchDetails);
		assert.deepStrictEqual(response?.serialize(), expected.serialize());
	});
});
