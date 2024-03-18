/**
 * Implémentation d'un système de cache pour les requêtes HTTP vers le serveur de la Fédération.
 * Chaque fonction du SDK peut utiliser ce cache pour stocker les réponses des requêtes HTTP, avec
 * des TTL différents.
 */
import { default as Sha } from 'jssha/sha1';
import { LRUCache } from 'lru-cache';
import { parse } from '@lukeed/ms';

const oneHour = 1000 * 60 * 60;

export const storage = new LRUCache<string, string>({
	max: 1000,
	ttl: oneHour,
	ttlAutopurge: true,
});

export function ms(value: string) {
	return parse(value) ?? oneHour;
}

export function generateSha(value: string) {
	// eslint-disable-next-line unicorn/text-encoding-identifier-case
	const sha = new Sha('SHA-1', 'TEXT', { encoding: 'UTF8' });
	sha.update(value);
	return sha.getHash('HEX');
}

export function purgeCache() {
	storage.clear();
}
