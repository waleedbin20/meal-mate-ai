export type MealCategory = "Standard" | "Large" | "Allergy Free" | "Energy Dense" | "Finger Food";

export interface DiningRoom {
  name: string;
  totalResidents: number;
  mealCategories: MealCategory[];
  menuType: string;
  offeringTiers: ("Silver" | "Gold" | "Platinum")[];
  menuCycle: "4" | "6";
}

export interface QuoteFormData {
  careHomeName: string;
  careHomeAddress: string;
  numberOfDiningRooms: number;
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