/**
 * Implémentation d'un système de cache pour les requêtes HTTP vers le serveur de la Fédération.
 * Chaque fonction du SDK peut utiliser ce cache pour stocker les réponses des requêtes HTTP, avec
 * des TTL différents.
 */
import { parse } from '@lukeed/ms';
import { LRUCache } from 'lru-cache';

export const oneHour = 1000 * 60 * 60;

export type CacheValue = {
	url: string;
	payload: ArrayBuffer;
};

export const storage = new LRUCache<string, CacheValue>({
	max: 1000,
	ttl: oneHour,
	ttlAutopurge: true,
});

export function ms(value: string) {
	return parse(value) ?? oneHour;
}

export function purgeCache() {
	storage.clear();
}
