export type MealCategory = 
  | "Standard"
  | "Level 3 IDDSI"
  | "Level 4 IDDSI"
  | "Level 5 IDDSI"
  | "Level 6 IDDSI"
  | "Allergy-Free"
  | "Finger Foods"
  | "Mini Meals";

export type PortionSize = "Small" | "Standard" | "Large";

export interface MenuOption {
  menuName: string;
  menuId: string;
}

export interface DiningRoom {
  name: string;
  totalResidents: number;
  mealCategories: MealCategory[];
  standardResidents: number;
  level3Residents: number;
  level4Residents: number;
  level5Residents: number;
  level6Residents: number;
  allergyFreeResidents: number;
  fingerFoodResidents: number;
  miniMealResidents: number;
  selectedMenu: MenuOption;
  portionSize?: PortionSize;
}

export type PriceListOption = 
  | "Jan 23 Launch Menu with TM"
  | "Bluestone Skydome Menu"
  | "NTC-H"
  | "29 St - The Fields"
  | "Abbey Total Care - Woodlands 28 1DR"
  | "Menu A - Sept 2024"
  | "Menu B - Sept 2024"
  | "1 Sam's Care Home";

export interface QuoteFormData {
  careHomeName: string;
  numberOfDiningRooms: number;
  diningRooms: DiningRoom[];
  priceListName: PriceListOption;
  currentLabourHours: number;
  currentLabourCost: number;
  currentFoodSpend: number;
  estimatedNonApetitoSpend: number;
  selectedMenu: MenuOption;
}