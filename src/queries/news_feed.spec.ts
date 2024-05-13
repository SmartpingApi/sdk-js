import { assert, describe, expect, it } from 'vitest';

import { SmartpingNews } from '#src/models/common/news';
import { smartping } from '#tests/setup.js';

describe('News Feed', () => {
	it('should fetch the 10 latest news from the Federation feed', async () => {
		const expected = new SmartpingNews({
			date: '2024-04-30',
			titre: 'Fête du Ping des 4/7 ans 2024 : en route vers les Jeux olympiques !',
			description:
				'La fête du Ping des 4/7 ans aura lieu cette année du mercredi 8 mai au dimanche 8 septembre 2024. A cette occasion, la Fédération encourage et propose à ses...',
			url: 'https://www.fftt.com/site/actualites/2024-04-30/fete-ping-4-7-ans-2024-en-route-vers-jeux-olympiques',
			photo: 'https://www.fftt.com/site/medias/news/news__20240430121829.jpg',
			categorie: 'Ping 4 - 7 ans',
		});

		const response = await smartping.getFederationNewsFeed();
		expect(response).toHaveLength(10);

		const news = response[0];

		expect(news).toBeInstanceOf(SmartpingNews);
		assert.deepStrictEqual(news?.serialize(), expected.serialize());
	});
});
