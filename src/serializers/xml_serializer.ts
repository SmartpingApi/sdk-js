import { XMLParser } from 'fast-xml-parser';

import UnexpectedApiResponseError from '#src/errors/unexpected_api_response.js';
import UnexpectedRootKeyError from '#src/errors/unexpected_root_key.js';
import type {
	SerializerInterface,
	DeserializationOptions,
} from '#src/serializers/serializer_interface.js';

type DecodedXml = { [key: string]: string | number | DecodedXml | Array<DecodedXml> };

export default class XmlSerializer implements SerializerInterface {
	/** Parser utilisé pour désérialiser les modèles XML. */
	readonly #parser: XMLParser;

	constructor() {
		this.#parser = new XMLParser({
			ignoreDeclaration: true,
			parseTagValue: false,
		});
	}

	/**
	 * Vérifie si le modèle XML a des enfants différents de la racine.
	 * C'est par exemple le cas de la requête pour accéder aux détails d'une rencontre
	 * de championnat par équipes.
	 */
	#hasDifferentChildren(rootKey: string) {
		return rootKey === 'liste';
	}

	#isList(xml: DecodedXml) {
		return Object.hasOwn(xml, 'liste');
	}

	deserialize<Model>(options: DeserializationOptions<Model>) {
		const { context, response, rootKey, normalizationModel, additionalProperties, charset } = options;

		/** Décodeur de texte utilisé pour décoder les réponses en ISO-8859-1 (notamment les accents). */
		const textDecoder = new TextDecoder(charset ?? 'ISO-8859-1');

		// Encodage de la réponse HTTP en UTF-8.
		const decodedText = textDecoder.decode(response.payload);

		// Désérialisation du XML en objet.
		const xml = this.#parser.parse(decodedText) as DecodedXml;

		// Ajout de propriétés supplémentaires de contexte à l'objet désérialisé.
		const properties = {};
		if (additionalProperties) {
			Object.assign(properties, {
				extras: additionalProperties,
			});
		}

		/**
		 * Si le modèle XML a des enfants de différents types, on sérialise directement
		 * le modèle en lui passant l'ensemble de l'objet.
		 */
		if (this.#hasDifferentChildren(rootKey)) {
			return new normalizationModel(Object.assign(properties, xml[rootKey]), context);
		}

		/**
		 * On regarde si l'objet contient la clé `liste` en seul enfant direct.
		 * Dans ce cas, on sait que l'on travaille avec une liste d'objets.
		 */
		const isList = this.#isList(xml);

		/**
		 * Si on attend un objet simple, on vérifie que la première
		 * clé enfant correspond bien à la clé attendue.
		 */
		if (!isList && !Object.hasOwn(xml, rootKey)) {
			throw new UnexpectedRootKeyError(rootKey, false, response.url);
		}

		/**
		 * Dans le cas contraire, on vérifie que la clé `liste` contient bien
		 * la clé attendue en enfants directs.
		 */
		if (isList && !Object.hasOwn(xml['liste'] as DecodedXml, rootKey)) {
			throw new UnexpectedRootKeyError(rootKey, true, response.url);
		}

		let isSingleResult = true;

		if (isList) {
			isSingleResult = !Array.isArray((xml['liste'] as DecodedXml)[rootKey] as DecodedXml);
		}

		if (!isList) {
			return new normalizationModel(Object.assign(properties, xml[rootKey]), context);
		}

		if (isList && isSingleResult) {
			const entryPath = (xml['liste'] as DecodedXml)[rootKey] as DecodedXml;
			return new normalizationModel(Object.assign(properties, entryPath), context);
		}

		if (isList && !isSingleResult) {
			const entries = (xml['liste'] as DecodedXml)[rootKey] as Array<DecodedXml>;
			return entries.map(
				(entry) => new normalizationModel(Object.assign(properties, entry), context),
			);
		}

		throw new UnexpectedApiResponseError();
	}
}
