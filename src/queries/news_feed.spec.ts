import { expect, it } from 'vitest';

import { SmartpingNews } from '#src/models/common/news';

import { getFederationNewsFeed } from './news_feed.js';

it('should fetch the 10 latest news from the Federation feed', async () => {
	const response = await getFederationNewsFeed();
	expect(response).toHaveLength(10);
	expect(response[0]).toBeInstanceOf(SmartpingNews);
});
