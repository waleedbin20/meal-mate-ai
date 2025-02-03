import {
  LighterMealOption,
  QuoteFormData,
} from "@/components/quote-form/types";
import { QuoteHistory, QuoteResponse } from "@/types/quoteResponse";

export const mapQuoteHistoryToFormRequestData = (item: QuoteHistory): QuoteFormData => {
  const lighterMealOption: LighterMealOption =
    item.lighterMealOption as LighterMealOption;

  return {
    careHomeName: item.careHomeName,
    creatorName: "",
    extras: {
      includeBreakfast: item.includeBreakfast,
      includeLighterMealDessert: item.includeLighterMealDessert,
      lighterMealOption: lighterMealOption,
      level4Options: [],
      level5Options: [],
      level6Options: []
    },
    totalResidents: item.numberOfResidents || 0,
    numberOfDiningRooms: item.numberOfDiningRooms || 0,
    selectedMenu: { 
      menuName: item.selectedMenu,
      menuId: "default"
    },
    diningRooms: [],
    priceListName: {
      customerNo: "",
      priceHierarchy: "",
      customerId: "",
      customerName: ""
    },
    currentLabourHours: 0,
    currentLabourCost: 0,
    currentFoodSpend: item.currentAnnualFoodSpend || 0,
    estimatedNonApetitoSpend: item.estimatedNonApetitoSpend || 0,
    numberOfRoles: item.numberOfRoles || 0,
    roles: [],
    apetitoLabor: {
      name: "",
      hourlyRate: 0,
      hoursPerWeek: 0,
      numberOfSimilarRoles: 0
    }
  };
};

export const mapQuoteHistoryToResponse = (
  item: QuoteHistory
): QuoteResponse => ({
  quoteDetails: {
    customerName: item.careHomeName,
    apetitoCostResidentPerDay: item.costPerDayPerResident || 0,
    menuOrderTotal: item.menuOrderTotal || 0,
    annualLaborSavings: item.annualLaborSavings || 0,
    annualFoodSavings: item.annualFoodSavings || 0,
    annualTotalSavings: item.annualTotalSavings || 0,
  },
});