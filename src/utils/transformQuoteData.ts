import { QuoteFormData } from "@/components/quote-form/types";
import { TransformedQuoteData } from "@/types/quoteResponse";

export const transformQuoteData = (data: QuoteFormData): TransformedQuoteData => {
  return {
    creatorName: data.creatorName || "",
    careHomeName: data.careHomeName,
    extras: {
      includeBreakfast: data.includeBreakfast,
      includeLighterMealDessert: data.includeLighterMealDessert,
      lighterMealOption: data.lighterMealOption,
      level4Options: data.level4Options || [],
      level5Options: data.level5Options || [],
      level6Options: data.level6Options || [],
    },
    numberOfDiningRooms: data.numberOfDiningRooms,
    diningRooms: data.diningRooms.map(room => ({
      name: room.diningRoomName,
      residents: {
        total: room.residents.total,
        categories: {
          multiTwinResidents: room.residents.categories.multiTwinResidents,
          level4Residents: room.residents.categories.level4Residents,
          level5Residents: room.residents.categories.level5Residents,
          level6Residents: room.residents.categories.level6Residents,
          diabeticResidents: room.residents.categories.diabeticResidents,
          glutenFreeResidents: room.residents.categories.glutenFreeResidents,
          dairyFreeResidents: room.residents.categories.dairyFreeResidents,
          eggFreeResidents: room.residents.categories.eggFreeResidents,
          soyFreeResidents: room.residents.categories.soyFreeResidents,
          vegetarianResidents: room.residents.categories.vegetarianResidents,
          veganResidents: room.residents.categories.veganResidents,
          kosherDietsResidents: room.residents.categories.kosherDietsResidents,
        },
      },
    })),
    currentAnnualFoodSpend: data.currentAnnualFoodSpend || 0,
    estimatedNonApetitoSpend: data.estimatedNonApetitoSpend || 0,
    numberOfRoles: data.numberOfRoles || 0,
    currentAnnualLabourCost: data.currentLabourCost || 0,
    apetitoEstimatedAnnualLabourCost: data.apetitoEstimatedAnnualLabourCost || 0,
  };
};