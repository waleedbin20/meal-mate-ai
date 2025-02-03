import { QuoteFormData } from "@/components/quote-form/types";

export const mapQuoteHistoryToFormData = (quoteHistory: any): QuoteFormData => {
  return {
    creatorName: "System",
    careHomeName: quoteHistory.careHomeName,
    extras: {
      includeBreakfast: quoteHistory.extras.includeBreakfast,
      includeLighterMealDessert: quoteHistory.extras.includeLighterMealDessert,
      lighterMealOption: quoteHistory.extras.lighterMealOption,
      level4Options: quoteHistory.extras.level4Options || [],
      level5Options: quoteHistory.extras.level5Options || [],
      level6Options: quoteHistory.extras.level6Options || [],
    },
    numberOfDiningRooms: quoteHistory.numberOfDiningRooms,
    totalResidents: quoteHistory.totalResidents,
    diningRooms: quoteHistory.diningRooms,
    roles: quoteHistory.roles,
    apetitoLabor: quoteHistory.apetitoLabor,
    numberOfRoles: quoteHistory.numberOfRoles,
    selectedMenu: quoteHistory.selectedMenu || { menuName: "Menu A - Jan 2025", menuId: "97481" },
    priceListName: quoteHistory.priceListName || {
      customerNo: "1103998",
      priceHierarchy: "0008801129",
      customerId: "2406",
      customerName: "National"
    },
    currentLabourHours: quoteHistory.currentLabourHours || 0,
    currentLabourCost: quoteHistory.currentLabourCost || 0,
    currentFoodSpend: quoteHistory.currentFoodSpend || 0,
    estimatedNonApetitoSpend: quoteHistory.estimatedNonApetitoSpend || 0
  };
};