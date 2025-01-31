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
  diningRooms: any[];
  roles: any[];
  apetitoLabor: {
    name: string;
    hourlyRate: number;
    hoursPerWeek: number;
    numberOfSimilarRoles: number;
  };
  numberOfRoles: number;
  selectedMenu: {
    menuName: string;
    menuId: string;
  };
  priceListName: {
    customerNo: string;
    priceHierarchy: string;
    customerId: string;
    customerName: string;
  };
  currentLabourHours: number;
  currentLabourCost: number;
  currentFoodSpend: number;
  estimatedNonApetitoSpend: number;
}

export interface TransformedQuoteData extends QuoteFormData {
  // Add any additional fields needed for transformed data
}

export type MealCategory = string;
export type MultiTwinSize = string;
export type MenuOption = string;
export type Level4Options = string;
export type Level5Options = string;
export type Level6Options = string;
export type LaborRole = string;