import { QuoteFormData } from "@/components/quote-form/types";

export const mapQuoteHistoryToFormData = (quoteHistory: any): QuoteFormData => {
  return {
    creatorName: "System",  // Add default creator name
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
  };
};