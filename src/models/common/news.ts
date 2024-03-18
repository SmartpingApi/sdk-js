import type { DateTime } from 'luxon';
import { createDate, stringifyDate } from '@/helpers/datetime_helpers.js';
import { BaseModel } from '@/models/base_model.js';

export interface NewProperties {
	date: string;
	titre: string;
	description: string;
	url: string;
	photo: string;
	categorie: string;
}

export class SmartpingNews extends BaseModel {
	/** Date de publication */
	readonly #date: DateTime;

	/** Titre */
	readonly #title: string;

	/** Description */
	readonly #description: string;

	/** URL */
	readonly #url: string;

	/** URL de l'image */
	readonly #thumbnail: string | undefined;

	/** Catégorie */
	readonly #category: string | undefined;

	constructor (properties: NewProperties) {
		super();
		this.#date = this.setOrFallback(properties.date, createDate(), (date) => createDate(date, 'YYYY-MM-DD'));
		this.#title = this.setOrFallback(properties.titre, '');
		this.#description = this.setOrFallback(properties.description, '');
		this.#url = this.setOrFallback(properties.url, '');
		this.#thumbnail = this.setOrFallback(properties.photo, undefined);
		this.#category = this.setOrFallback(properties.categorie, undefined);
	}

	public get date() {
		return this.#date;
	}

	public get title() {
		return this.#title;
	}

	public get description() {
		return this.#description;
	}

	public get url() {
		return this.#url;
	}

	public get thumbnail() {
		return this.#thumbnail;
	}

	public get category() {
		return this.#category;
	}

	public serialize() {
		return {
			date: stringifyDate(this.#date),
			title: this.#title,
			description: this.#description,
			url: this.#url,
			thumbnail: this.#thumbnail,
			category: this.#category,
		};
	}
}
