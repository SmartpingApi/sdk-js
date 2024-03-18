import { expect, it } from 'vitest';
import { getFederationNewsFeed } from './news_feed.js';
import { SmartpingNews } from '@/models/index.js';

it('should fetch the 10 latest news from the Federation feed', async () => {
	const response = await getFederationNewsFeed();
	expect(response).toHaveLength(10);
	expect(response[0]).toBeInstanceOf(SmartpingNews);
});
