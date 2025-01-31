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
    lighterMealOption: string;
    level4Options: string[];
    level5Options: string[];
    level6Options: string[];
  };
  numberOfDiningRooms: number;
  totalResidents: number;
  diningRooms: any[];
  roles: any[];
  apetitoLabor: number;
  numberOfRoles: number;
}
