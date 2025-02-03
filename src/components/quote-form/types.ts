export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
}

export interface QuoteFormData {
  creatorName: string;
  careHomeName: string;
  extras: {
    includeBreakfast: boolean;
    includeLighterMealDessert: boolean;
    lighterMealOption: string | null;
    level4Options: string[];
    level5Options: string[];
    level6Options: string[];
  };
  numberOfDiningRooms: number;
  totalResidents: number;
  diningRooms: DiningRoom[];
  roles: LaborRole[];
  apetitoLabor: ApetitoLabor;
  numberOfRoles: number;
  selectedMenu: MenuSelection;
  priceListName: PriceList;
  currentLabourHours: number;
  currentLabourCost: number;
  currentFoodSpend: number;
  estimatedNonApetitoSpend: number;
}

export interface DiningRoom {
  name: string;
  mealCategories: MealCategory[];
  multiTwinResidents: number;
  level3Residents: number;
  level4Residents: number;
  level5Residents: number;
  level6Residents: number;
  allergyFreeResidents: number;
  fingerFoodResidents: number;
  miniMealResidents: number;
  caribbeanDietsResidents: number;
  kosherDietsResidents: number;
  halalDietsResidents: number;
  totalResidentsInDiningRoom: number;
  multiTwinSize?: MultiTwinSize;
}

export interface LaborRole {
  name: string;
  hourlyRate: number;
  hoursPerWeek: number;
  numberOfSimilarRoles: number;
}

export type Role = LaborRole;

export interface ApetitoLabor {
  name: string;
  hourlyRate: number;
  hoursPerWeek: number;
  numberOfSimilarRoles: number;
}

export interface MenuSelection {
  menuName: string;
  menuId: string;
}

export interface PriceList {
  customerNo: string;
  priceHierarchy: string;
  customerId: string;
  customerName: string;
}

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

export type MultiTwinSize = "Standard" | "Large";

export interface MenuOption {
  menuName: string;
  menuId: string;
}

export type Level4Options = "Breakfast" | "Snacks" | "Dessert";
export type Level5Options = "Dessert";
export type Level6Options = "Dessert";

export interface TransformedQuoteData extends QuoteFormData {
  careHomeDetails?: {
    name: string;
  };
  diningInformation?: {
    numberOfDiningRooms: number;
    diningRooms: any[];
  };
  pricingInformation?: {
    priceListName: PriceList;
    currentFoodSpend: number;
    estimatedNonApetitoSpend: number;
  };
  labourAndCost?: {
    currentLabour: {
      roles: LaborRole[];
      totalHours: number;
      totalCost: number;
    };
    apetitoLabour: ApetitoLabor;
  };
}