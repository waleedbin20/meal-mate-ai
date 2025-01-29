export interface QuoteHistoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: QuoteHistoryItem[];
  timestamp: string;
  errors: null | string[];
}

export interface QuoteHistoryItem {
  id: number;
  quoteId: number;
  versionNumber: number;
  type: QuoteHistoryType;
  createdOn: string;
  careHomeName: string;
  numberOfResidents: number | null;
  numberOfDiningRooms: number | null;
  selectedMenu: string;
  extraMealOptions: string;
  currentAnnualFoodSpend: number | null;
  estimatedNonApetitoSpend: number | null;
  numberOfRoles: number | null;
  currentAnnualLabourCost: number | null;
  apetitoEstimatedAnnualLabourCost: number | null;
  costPerDayPerResident: number | null;
  menuOrderTotal: number | null;
  annualLaborSavings: number | null;
  annualFoodSavings: number | null;
  annualTotalSavings: number | null;
}

export enum QuoteHistoryType {
  Request = 0,
  Response = 1
}