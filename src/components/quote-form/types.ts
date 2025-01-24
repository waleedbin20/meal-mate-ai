export type MealCategory = 
  | "Multi Twin"
  | "Level 3 IDDSI"
  | "Level 4 IDDSI"
  | "Level 5 IDDSI"
  | "Level 6 IDDSI"
  | "Allergy-Free"
  | "Finger Foods"
  | "Mini Meals"
  | "Religious Diets";

export type MultiTwinSize = "Standard" | "Small" | "Large";

export type LighterMealOption = "standard" | "two-course" | "premium" | null;

export interface MenuOption {
  menuName: string;
  menuId: string;
}

export interface ExtraOptions {
  includeBreakfast: boolean;
  lighterMealOption: LighterMealOption;
  includeLighterMealDessert: boolean;
}

export interface PriceListOption {
  customerNo: string;
  priceHierarchy: string;
  customerId: string;
}

export interface LaborRole {
  name: string;
  hourlyRate: number;
  hoursPerWeek: number;
  numberOfSimilarRoles: number;
}

export interface DiningRoom {
  name: string;
  mealCategories: MealCategory[];
  multiTwinSize?: MultiTwinSize;
  multiTwinResidents: number;
  level3Residents: number;
  level4Residents: number;
  level5Residents: number;
  level6Residents: number;
  allergyFreeResidents: number;
  fingerFoodResidents: number;
  miniMealResidents: number;
  religiousDietsResidents: number;
  totalResidentsInDiningRoom: number;
}

export interface QuoteFormData {
  creatorName: string;
  careHomeName: string;
  numberOfDiningRooms: number;
  totalResidents: number;
  diningRooms: DiningRoom[];
  selectedMenu: MenuOption;
  extras: ExtraOptions;
  priceListName: PriceListOption;
  currentLabourHours: number;
  currentLabourCost: number;
  currentFoodSpend: number;
  estimatedNonApetitoSpend: number;
  numberOfRoles: number;
  roles: LaborRole[];
  apetitoLabor: LaborRole;
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