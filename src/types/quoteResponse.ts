export interface QuoteResponse {
  summary?: string;
  quoteDetails: {
    customerName?: string;
    apetitoCostResidentPerDay?: number;
    menuOrderTotal?: number;
    annualLaborSavings?: number;
    annualFoodSavings?: number;
    annualTotalSavings?: number;
    versionNumber?: number;
  };
}

export interface SavedQuote {
  id: number;
  creatorName: string;
  createdOn: string;
  careHomeName: string;
  totalResidents: number;
  quoteStatus: string;
  quoteNo: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface QuoteHistory {
  id: number;
  quoteId: number;
  versionNumber: number;
  type: HistoryType;
  createdOn: string;
  careHomeName: string;
  numberOfResidents?: number;
  numberOfDiningRooms?: number;
  selectedMenu: string;
  includeBreakfast: boolean;
  lighterMealOption: string;
  includeLighterMealDessert: boolean;
  currentAnnualFoodSpend?: number;
  estimatedNonApetitoSpend?: number;
  numberOfRoles?: number;
  currentAnnualLabourCost?: number;
  apetitoEstimatedAnnualLabourCost?: number;
  costPerDayPerResident?: number;
  menuOrderTotal?: number;
  annualLaborSavings?: number;
  annualFoodSavings?: number;
  annualTotalSavings?: number;
}

export enum HistoryType {
  Request = 0,
  Response = 1,
}

export interface TransformedQuoteData {
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
  diningRooms: {
    name: string;
    residents: {
      total: number;
      categories: {
        multiTwinResidents: { size: string; count: number }[];
        level4Residents: number;
        level5Residents: number;
        level6Residents: number;
        diabeticResidents: number;
        glutenFreeResidents: number;
        dairyFreeResidents: number;
        eggFreeResidents: number;
        soyFreeResidents: number;
        vegetarianResidents: number;
        veganResidents: number;
        kosherDietsResidents: number;
      };
    };
  }[];
  currentAnnualFoodSpend: number;
  estimatedNonApetitoSpend: number;
  numberOfRoles: number;
  currentAnnualLabourCost: number;
  apetitoEstimatedAnnualLabourCost: number;
}