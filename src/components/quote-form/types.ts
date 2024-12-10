export interface DiningRoom {
  name: string;
  standardMeals: number;
  allergyFreeMeals: number;
  energyDenseMeals: number;
  fingerMeals: number;
  menuType: string;
  portionSize: "standard" | "large";
}

export interface QuoteFormData {
  careHomeName: string;
  careHomeAddress: string;
  diningRooms: DiningRoom[];
  offeringTier: "Silver" | "Platinum";
  menuCycle: string;
  breakfastIncluded: boolean;
  teaIncluded: boolean;
  priceListNumber: string;
  currentLabourHours: number;
  currentLabourCost: number;
  currentFoodSpend: number;
  estimatedNonApetitoSpend: number;
}