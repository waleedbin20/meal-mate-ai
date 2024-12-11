export type PortionSize = "Small" | "Standard" | "Large";

export type MealCategory = 
  | "Standard"
  | "Level 3 IDDSI"
  | "Level 4 IDDSI"
  | "Level 5 IDDSI"
  | "Level 6 IDDSI"
  | "Allergy-Free"
  | "Finger Foods"
  | "Mini Meals";

export interface DiningRoom {
  name: string;
  totalResidents: number;
  mealCategories: MealCategory[];
  menuType: string;
  offeringTiers: ("Silver" | "Gold" | "Platinum")[];
  menuCycle: "4";
  portionSize: PortionSize;
  standardResidents: number;
  level3Residents: number;
  level4Residents: number;
  level5Residents: number;
  level6Residents: number;
  allergyFreeResidents: number;
  fingerFoodResidents: number;
  miniMealResidents: number;
}

export interface QuoteFormData {
  careHomeName: string;
  numberOfDiningRooms: number;
  diningRooms: DiningRoom[];
  menuCycle: string;
  priceListNumber: string;
  currentLabourHours: number;
  currentLabourCost: number;
  currentFoodSpend: number;
  estimatedNonApetitoSpend: number;
}