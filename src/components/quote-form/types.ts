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
  menuId: string;
}

export interface PriceListOption {
  customerNo: string;
  priceHierarchy: string;
  customerId: string;
}

export interface LaborRole {
  hourlyRate: number;
  hoursPerWeek: number;
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
  creatorName: string;  // Added this field
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
      role1: LaborRole;
      role2: LaborRole;
      role3: LaborRole;
      totalHours: number;
      totalCost: number;
    };
    apetitoLabour: LaborRole;
  };
}