import {
	callAPI,
	getResponseAsArray,
	mergeRankedAndSpidPlayerCollection,
} from './smartping-core'
import { ApiEndpoints } from '../enums/api-endpoints'
import RankedPlayer from '../models/player/ranked-player'
import type { RankedPlayerConstructorProperties } from '../models/player/ranked-player'
import SpidPlayer from '../models/player/spid-player'
import type { SpidPlayerConstructorProperties } from '../models/player/spid-player'
import Player from '../models/player/player'
import PlayerDetails from '../models/player/player-details'
import type { PlayerDetailsConstructorProperties } from '../models/player/player-details'
import RankedGame from '../models/player/ranked-game'
import type { RankedGameConstructorProperties } from '../models/player/ranked-game'
import SpidGame from '../models/player/spid-game'
import type { SpidGameConstructorProperties } from '../models/player/spid-game'
import Game from '../models/player/game'
import PlayerRankHistory from '../models/player/player-rank-history'
import type { PlayerRankHistoryConstructorProperties } from '../models/player/player-rank-history'

export default class PlayerApi {
	public static async findPlayersByNameOnRankingBase(lastname: string, firstname?: string): Promise<RankedPlayer[]> {
		const parameters: { nom: string, prenom?: string } = {
			nom: lastname,
		};

		if (firstname) {
			parameters['prenom'] = firstname;
		}

		const response = await callAPI<RankedPlayer, RankedPlayerConstructorProperties>({
			endpoint: ApiEndpoints.XML_LISTE_JOUEUR,
			requestParameters: {...parameters},
			normalizationModel: RankedPlayer,
			rootKey: 'joueur'
		}) as RankedPlayer|RankedPlayer[]|undefined;

		return getResponseAsArray(response);
	}

	public static async findPlayersByNameOnSpidBase(lastname: string, firstname?: string, valid = false): Promise<SpidPlayer[]> {
		const parameters: { nom: string, prenom?: string } = {
			nom: lastname,
		};

		if (firstname) {
			parameters['prenom'] = firstname;
		}

		const response = await callAPI<SpidPlayer, SpidPlayerConstructorProperties>({
			endpoint: ApiEndpoints.XML_LISTE_JOUEUR_O,
			requestParameters: { valid: valid ? '1' : '0', ...parameters },
			normalizationModel: SpidPlayer,
			rootKey: 'joueur'
		}) as SpidPlayer|SpidPlayer[]|undefined;

		return getResponseAsArray(response);
	}

	public static async findPlayersByName(lastname: string, firstname?: string, valid = false): Promise<Player[]> {
		const rankedResponse = await this.findPlayersByNameOnRankingBase(lastname, firstname);
		const spidResponse = await this.findPlayersByNameOnSpidBase(lastname, firstname, valid);

		return mergeRankedAndSpidPlayerCollection(rankedResponse, spidResponse);
	}

	public static async findPlayersByClubOnRankingBase(clubCode: string): Promise<RankedPlayer[]> {
		const response = await callAPI<RankedPlayer, RankedPlayerConstructorProperties>({
			endpoint: ApiEndpoints.XML_LISTE_JOUEUR,
			requestParameters: {
				club: clubCode
			},
			normalizationModel: RankedPlayer,
			rootKey: 'joueur'
		}) as RankedPlayer|RankedPlayer[]|undefined;

		return getResponseAsArray(response);
	}

	public static async findPlayersByClubOnSpidBase(clubCode: string, valid = false): Promise<SpidPlayer[]> {
		const response = await callAPI<SpidPlayer, SpidPlayerConstructorProperties>({
			endpoint: ApiEndpoints.XML_LISTE_JOUEUR_O,
			requestParameters: {
				club: clubCode,
				valid: valid ? '1' : '0'
			},
			normalizationModel: SpidPlayer,
			rootKey: 'joueur'
		}) as SpidPlayer|SpidPlayer[]|undefined;

		return getResponseAsArray(response);
	}

	public static async findPlayersByClub(clubCode: string, valid = false): Promise<Player[]> {
		const rankedResponse = await this.findPlayersByClubOnRankingBase(clubCode);
		const spidResponse = await this.findPlayersByClubOnSpidBase(clubCode, valid);

		return mergeRankedAndSpidPlayerCollection(rankedResponse, spidResponse);
	}

	public static async getPlayerOnRankingBase(licence: string): Promise<RankedPlayer|undefined> {
		return await callAPI<RankedPlayer, RankedPlayerConstructorProperties>({
			endpoint: ApiEndpoints.XML_JOUEUR,
			requestParameters: {
				licence
			},
			normalizationModel: RankedPlayer,
			rootKey: 'joueur'
		}) as RankedPlayer|undefined;
	}

	public static async getPlayerOnSpidBase(licence: string): Promise<SpidPlayer|undefined> {
		return await callAPI<SpidPlayer, SpidPlayerConstructorProperties>({
			endpoint: ApiEndpoints.XML_LICENCE,
			requestParameters: {
				licence
			},
			normalizationModel: SpidPlayer,
			rootKey: 'licence'
		}) as SpidPlayer|undefined;
	}

	public static async getPlayer(licence: string): Promise<PlayerDetails|undefined> {
		return await callAPI<PlayerDetails, PlayerDetailsConstructorProperties>({
			endpoint: ApiEndpoints.XML_LICENCE_B,
			requestParameters: {
				licence
			},
			normalizationModel: PlayerDetails,
			rootKey: 'licence'
		}) as PlayerDetails|undefined;
	}

	public static async getPlayerGameHistoryOnRankingBase(licence: string): Promise<RankedGame[]> {
		const response = await callAPI<RankedGame, RankedGameConstructorProperties>({
			endpoint: ApiEndpoints.XML_PARTIE_MYSQL,
			requestParameters: {
				licence
			},
			normalizationModel: RankedGame,
			rootKey: 'partie'
		}) as RankedGame|RankedGame[]|undefined;

		return getResponseAsArray(response);
	}

	public static async getPlayerGameHistoryOnSpidBase(licence: string): Promise<SpidGame[]> {
		const response = await callAPI<SpidGame, SpidGameConstructorProperties>({
			endpoint: ApiEndpoints.XML_PARTIE,
			requestParameters: {
				licence
			},
			normalizationModel: SpidGame,
			rootKey: 'partie'
		}) as SpidGame|SpidGame[]|undefined;

		return getResponseAsArray(response);
	}

	public static async getPlayerGameHistory(licence: string): Promise<Game[]> {
		const ranked = await this.getPlayerGameHistoryOnRankingBase(licence);
		const spid = await this.getPlayerGameHistoryOnSpidBase(licence);

		if (ranked.length === 0 && spid.length === 0) {
			return [];
		}

		const rankedIndexed = new Map<string, RankedGame>();
		for (const r of ranked) {
			rankedIndexed.set(String(r.isVictory())+'//'+r.opponentName()+'//'+r.date().getTime(), r);
		}

		const spidIndexed = new Map<string, SpidGame>();
		for (const s of spid) {
			spidIndexed.set(String(s.isVictory())+'//'+s.opponentName()+'//'+s.date().getTime(), s);
		}

		const result = [];

		if (rankedIndexed.size > 0) {
			for (const [identifier, game] of rankedIndexed.entries()) {
				if (spidIndexed.has(identifier)) {
					result.push(new Game(game, spidIndexed.get(identifier)))
					spidIndexed.delete(identifier);
				} else {
					result.push(new Game(game, undefined))
				}
			}
		}

		if (spidIndexed.size > 0) {
			for (const [_, game] of spidIndexed.entries()) {
				result.push(new Game(undefined, game))
			}
		}

		return result;
	}

	public static async getPlayerRankHistory(licence: string): Promise<PlayerRankHistory[]> {
		const response = await callAPI<PlayerRankHistory, PlayerRankHistoryConstructorProperties>({
			endpoint: ApiEndpoints.XML_HISTO_CLASSEMENT,
			requestParameters: {
				numlic: licence
			},
			normalizationModel: PlayerRankHistory,
			rootKey: 'histo'
		}) as PlayerRankHistory|PlayerRankHistory[]|undefined;

		return getResponseAsArray(response);
	}
}
