export interface DiningRoom {
  name: string;
  totalResidents: number;
  standardMeals: number;
  allergyFreeMeals: number;
  energyDenseMeals: number;
  fingerMeals: number;
  menuType: string;
  portionSize: "standard" | "large";
  offeringTiers: ("Silver" | "Gold" | "Platinum")[];
  menuCycle: "4" | "6";
}

export interface QuoteFormData {
  careHomeName: string;
  careHomeAddress: string;
  diningRooms: DiningRoom[];
  offeringTier: "Silver" | "Gold" | "Platinum";
  menuCycle: string;
  breakfastIncluded: boolean;
  teaIncluded: boolean;
  priceListNumber: string;
  currentLabourHours: number;
  currentLabourCost: number;
  currentFoodSpend: number;
  estimatedNonApetitoSpend: number;
}