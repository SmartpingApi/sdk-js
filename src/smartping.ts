import { Credentials } from '@/config.js';
import { authenticate } from '@/queries/authenticate.js';
import { getFederationNewsFeed } from '@/queries/news_feed.js';
import playerApi from '@/queries/players/index.js';
import clubApi from '@/queries/clubs/index.js';

export default function createSmartpingInstance (appId: string, appKey: string) {
	Credentials.setCredentials(appId, appKey);

	return {
		players: playerApi,
		clubs: clubApi,
		authenticate,
		getFederationNewsFeed,
	}
}
