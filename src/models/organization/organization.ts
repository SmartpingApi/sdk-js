import { BaseModel } from '#src/models/base_model.js';
import { findOrganizationsByType, getOrganization, OrganizationTypes } from '#src/queries/organizations/find_by_type.js';

type NewProperties = {
	id: number;
	libelle: string;
	code: string;
	idPere: string;
}

type OrganizationType = 'F'|'Z'|'L'|'D';
type FederationIdentifiers = 'FEDE';
type ZoneIdentifiers = 'Z01'|'Z02'|'Z03'|'Z04'|'Z05'|'Z06'|'Z07';
type LeagueIdentifiers = 'L01'|'L02'|'L03'|'L04'|'L05'|'L06'|'L07'|'L08'|'L09'|'L10'|'L11'|'L12'|'L13'|'L30'|'L31'|'L32'|'L33'|'L34'|'L36'|'L37'|'L38';
type DepartmentIdentifiers = 'D01'|'D02'|'D03'|'D04'|'D06'|'D08'|'D09'|'D10'|'D11'|'D12'|'D13'|'D14'|'D15'|'D16'|'D17'|'D18'|'D19'|'D21'|'D22'|'D23'|'D24'|'D25'|'D26'|'D27'|'D28'|'D29'|'D30'|'D31'|'D32'|'D33'|'D34'|'D35'|'D36'|'D37'|'D38'|'D39'|'D40'|'D41'|'D42'|'D44'|'D45'|'D46'|'D47'|'D48'|'D49'|'D50'|'D51'|'D52'|'D53'|'D54'|'D55'|'D56'|'D57'|'D58'|'D59'|'D60'|'D61'|'D62'|'D63'|'D64'|'D65'|'D66'|'D67'|'D68'|'D69'|'D70'|'D71'|'D72'|'D73'|'D74'|'D75'|'D76'|'D77'|'D78'|'D79'|'D80'|'D81'|'D82'|'D83'|'D84'|'D85'|'D86'|'D87'|'D88'|'D89'|'D90'|'D91'|'D92'|'D93'|'D94'|'D95'|'D98'|'D99'|'D9A'|'D9B'|'D9C'|'D9D'|'D9E'|'D9F'|'D9G'|'D9H'|'D9W';

export type OrganizationIdentifier = FederationIdentifiers|ZoneIdentifiers|LeagueIdentifiers|DepartmentIdentifiers;

type RelationName = 'parent'|'children';

export class SmartpingOrganization extends BaseModel {
	/** ID interne pour la Fédération */
	readonly #id: number;

	/** Nom */
	readonly #name: string;

	/** Code */
	readonly #code: OrganizationIdentifier;

	/** ID de l'organisme parent */
	readonly #parentId: number | undefined;

	/** Type d'organisation */
	readonly #type: OrganizationType;

	/** Organisme parent */
	#parent: SmartpingOrganization | undefined;

	/** Organismes enfants */
	#children: Array<SmartpingOrganization> = [];

	constructor (properties: NewProperties) {
		super();
		this.#id = this.setOrFallback(properties.id, 0, Number);
		this.#name = this.setOrFallback(properties.libelle, '');
		this.#code = this.setOrFallback(properties.code, 'FEDE');
		this.#parentId = this.setOrFallback(properties.idPere, undefined, Number);
		this.#type = this.setOrFallback(properties.code, 'F', (v) => v.slice(0, 1) as OrganizationType);
	}

	public get id() {
		return this.#id;
	}

	public get name() {
		return this.#name;
	}

	public get code() {
		return this.#code;
	}

	public get parentId() {
		return this.#parentId;
	}

	public get type() {
		return this.#type;
	}

	public get parent() {
		return this.#parent;
	}

	public get children() {
		return this.#children;
	}

	public async preload(relations: Array<RelationName>|'*') {
		const preloadFunctions: Record<RelationName, () => Promise<void>> = {
			parent: async () => {
				if (this.#type === 'Z') {
					this.#parent = await getOrganization('FEDE');

					return;
				}

				if (this.#type === 'L') {
					const organizations = await findOrganizationsByType(OrganizationTypes.Zone);
					this.#parent = organizations.find((org) => org.id === this.#parentId);

					return;
				}

				if (this.#type === 'D') {
					const organizations = await findOrganizationsByType(OrganizationTypes.League);
					this.#parent = organizations.find((org) => org.id === this.#parentId);

					return;
				}

				this.#parent = undefined;
			},
			children: async () => {
				if (this.#type === 'F') {
					this.#children = await findOrganizationsByType(OrganizationTypes.Zone);

					return;
				}

				if (this.#type === 'Z') {
					const organizations = await findOrganizationsByType(OrganizationTypes.League);
					this.#children = organizations.filter((org) => org.id === this.#parentId);

					return;
				}

				if (this.#type === 'L') {
					const organizations = await findOrganizationsByType(OrganizationTypes.Department);
					this.#children = organizations.filter((org) => org.id === this.#parentId);

					return;
				}

				this.#children = [];
			}
		};

		await this.preloadRelations(relations, preloadFunctions);
	}
}
