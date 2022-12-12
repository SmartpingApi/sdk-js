import { SmartpingObject } from '../smartping-object'
import { isEmpty, stringifyDate } from '../../helpers/validation'
import { createDate } from '../../helpers/datetime-helpers'

export interface NewsConstructorProperties {
	date: string;
	titre: string;
	description: string;
	url: string;
	photo: string;
	categorie: string;
}

export interface NewsExportProperties {
	date: string;
	title: string;
	description: string;
	url: string;
	thumbnail?: string;
	category?: string;
}

export default class News extends SmartpingObject {
	readonly #date: Date;
	readonly #title: string;
	readonly #description: string;
	readonly #url: string;
	readonly #thumbnail?: string;
	readonly #category?: string;

	constructor (properties: NewsConstructorProperties) {
		super();

		this.#date = isEmpty(properties.date) ? createDate() : createDate(properties.date, 'YYYY-MM-DD');
		this.#title = isEmpty(properties.titre) ? '' : properties.titre;
		this.#description = isEmpty(properties.description) ? '' : properties.description;
		this.#url = isEmpty(properties.url) ? '' : properties.url;
		this.#thumbnail = isEmpty(properties.photo) ? undefined : properties.photo;
		this.#category = isEmpty(properties.categorie) ? undefined : properties.categorie;
	}

	public date(): Date
	{
		return this.#date;
	}

	public title(): string
	{
		return this.#title;
	}

	public description(): string
	{
		return this.#description;
	}

	public url(): string
	{
		return this.#url;
	}

	public thumbnail(): string|undefined
	{
		return this.#thumbnail;
	}

	public category(): string|undefined
	{
		return this.#category;
	}


	public normalize(): NewsExportProperties {
		return {
			date: stringifyDate(this.#date) || '',
			title: this.#title,
			description: this.#description,
			url: this.#url,
			thumbnail: this.#thumbnail,
			category: this.#category,
		};
	}
}
