export type MealCategory =
	| "Multi Twin"
	| "Level 3"
	| "Level 4"
	| "Level 5"
	| "Level 6"
	| "Allergy-Free"
	| "Finger Foods"
	| "Mini Meals Extra"
	| "Caribbean"
	| "Halal"
	| "Kosher";

export type MultiTwinSize = "Standard" | "Small" | "Large";

export type LighterMealOption = "standard" | "two-course" | "premium" | "";

export type Level4Options = "Breakfast" | "Snacks" | "Dessert";
export type Level5Options = "Dessert";
export type Level6Options = "Dessert";

export interface MenuOption {
	menuName?: string;
	menuId?: string;
}

export interface PriceListOption {
	customerNo?: string;
	priceHierarchy?: string;
	customerId?: string;
	customerName?: string;
}

export interface LaborRole {
	id?: number;
	name?: string;
	hourlyRate?: number;
	hoursPerWeek?: number;
	numberOfSimilarRoles?: number;
	quoteId?: number;
}

export interface DiningRoom {
	id?: number;
	name: string;
	mealCategories?: MealCategory[];
	multiTwinSize?: MultiTwinSize;
	multiTwinResidents: number;
	level3Residents: number;
	level4Residents: number;
	level5Residents: number;
	level6Residents: number;
	allergyFreeResidents: number;
	fingerFoodResidents: number;
	miniMealResidents: number;
	caribbeanDietsResidents: number;
	halalDietsResidents: number;
	kosherDietsResidents: number;
	totalResidentsInDiningRoom: number;
	quoteId?: number;
}

export interface QuoteFormData {
	id?: number;
	creatorName?: string;
	careHomeName?: string;
	numberOfDiningRooms?: number;
	totalResidents?: number;
	diningRooms?: DiningRoom[];
	selectedMenu?: MenuOption;
	extras?: ExtraOptions;
	priceListName?: PriceListOption;
	currentLabourHours?: number;
	currentLabourCost?: number;
	currentFoodSpend?: number;
	estimatedNonApetitoSpend?: number;
	numberOfRoles?: number;
	roles?: LaborRole[];
	apetitoLabor?: LaborRole;
}

export interface TransformedQuoteData {
	careHomeDetails: {
		name: string;
	};
	diningInformation: {
		numberOfDiningRooms: number;
		diningRooms: Array<{
			diningRoomName: string;
			residents: {
				total: number;
				categories: {
					multiTwinResidents: {
						size: MultiTwinSize;
						count: number;
					};
					level3Residents: number;
					level4Residents: number;
					level5Residents: number;
					level6Residents: number;
					allergyFreeResidents: number;
					fingerFoodResidents: number;
					miniMealResidents: number;
					religiousDietsResidents: number;
				};
			};
			menuInformation: MenuOption;
		}>;
	};
	pricingInformation: {
		priceListName: PriceListOption;
		currentFoodSpend: number;
		estimatedNonApetitoSpend: number;
	};
	labourAndCost: {
		currentLabour: {
			roles: LaborRole[];
			totalHours: number;
			totalCost: number;
		};
		apetitoLabour: LaborRole;
	};
}

export interface ExtraOptions {
	includeBreakfast: boolean;
	lighterMealOption: LighterMealOption;
	includeLighterMealDessert: boolean;
	level4Options?: Level4Options[];
	level5Options?: Level5Options[];
	level6Options?: Level6Options[];
}
