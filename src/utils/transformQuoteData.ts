import { QuoteFormData, TransformedQuoteData } from "@/components/quote-form/types";

export const transformQuoteData = (data: QuoteFormData): TransformedQuoteData => {
  return {
    creatorName: data.creatorName,
    careHomeName: data.careHomeName,
    extras: data.extras,
    numberOfDiningRooms: data.numberOfDiningRooms,
    diningRooms: data.diningRooms.map(room => ({
      name: room.name,
      multiTwinResidents: room.multiTwinResidents,
      level3Residents: room.level3Residents,
      level4Residents: room.level4Residents,
      level5Residents: room.level5Residents,
      level6Residents: room.level6Residents,
      allergyFreeResidents: room.allergyFreeResidents,
      fingerFoodResidents: room.fingerFoodResidents,
      miniMealResidents: room.miniMealResidents,
      caribbeanDietsResidents: room.caribbeanDietsResidents,
      halalDietsResidents: room.halalDietsResidents,
      kosherDietsResidents: room.kosherDietsResidents,
      totalResidentsInDiningRoom: room.totalResidentsInDiningRoom,
      mealCategories: room.mealCategories
    })),
    selectedMenu: data.selectedMenu,
    priceListName: data.priceListName,
    currentLabourHours: data.currentLabourHours,
    currentLabourCost: data.currentLabourCost,
    currentFoodSpend: data.currentFoodSpend,
    estimatedNonApetitoSpend: data.estimatedNonApetitoSpend,
    numberOfRoles: data.numberOfRoles,
    roles: data.roles,
    apetitoLabor: data.apetitoLabor
  };
};