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

export interface MenuOption {
  menuName: string;
  menuId: number;
}

export interface PriceListOption {
  customerNo: string;
  priceHierarchy: string;
}

export interface LaborRole {
  hourlyRate: number;
  hoursPerWeek: number;
}

export interface DiningRoom {
  name: string;
  mealCategories: MealCategory[];
  selectedMenu: MenuOption;
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
}

export interface QuoteFormData {
  careHomeName: string;
  numberOfDiningRooms: number;
  totalResidents: number;
  diningRooms: DiningRoom[];
  selectedMenu: MenuOption;
  priceListName: PriceListOption;
  currentLabourHours: number;
  currentLabourCost: number;
  currentFoodSpend: number;
  estimatedNonApetitoSpend: number;
  role1: LaborRole;
  role2: LaborRole;
  role3: LaborRole;
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
      menuInformation: {
        menuName: string;
        menuId: number;
      };
    }>;
  };
  pricingInformation: {
    priceListName: PriceListOption;
    currentFoodSpend: number;
    estimatedNonApetitoSpend: number;
  };
  labourAndCost: {
    currentLabour: {
      role1: LaborRole;
      role2: LaborRole;
      role3: LaborRole;
      totalHours: number;
      totalCost: number;
    };
    apetitoLabour: LaborRole;
  };
}
