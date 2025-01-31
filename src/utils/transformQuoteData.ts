import { QuoteFormData, TransformedQuoteData } from "@/components/quote-form/types";

export const transformQuoteData = (data: QuoteFormData): TransformedQuoteData => {
  const totalLabourHours = data.roles?.reduce((total, role) => {
    return total + ((role?.hoursPerWeek || 0) * (role?.numberOfSimilarRoles || 0));
  }, 0) || 0;

  const totalLabourCost = data.roles?.reduce((total, role) => {
    return total + ((role?.hourlyRate || 0) * (role?.hoursPerWeek || 0) * 52 * (role?.numberOfSimilarRoles || 0));
  }, 0) || 0;

  const transformedDiningRooms = data.diningRooms.map(room => ({
    diningRoomName: room.name,
    residents: {
      total: room.totalResidentsInDiningRoom,
      categories: {
        multiTwinResidents: {
          size: room.multiTwinSize || "Standard",
          count: room.multiTwinResidents
        },
        level3Residents: room.level3Residents,
        level4Residents: room.level4Residents,
        level5Residents: room.level5Residents,
        level6Residents: room.level6Residents,
        allergyFreeResidents: room.allergyFreeResidents,
        fingerFoodResidents: room.fingerFoodResidents,
        miniMealResidents: room.miniMealResidents,
        caribbeanDietsResidents: room.caribbeanDietsResidents,
        halalDietsResidents: room.halalDietsResidents,
        kosherDietsResidents: room.kosherDietsResidents
      },
    },
    menuInformation: data.selectedMenu,
  }));

  return {
    careHomeDetails: {
      name: data.careHomeName || "",
    },
    diningInformation: {
      numberOfDiningRooms: data.numberOfDiningRooms,
      diningRooms: transformedDiningRooms,
    },
    pricingInformation: {
      priceListName: data.priceListName,
      currentFoodSpend: data.currentFoodSpend || 0,
      estimatedNonApetitoSpend: data.estimatedNonApetitoSpend || 0,
    },
    labourAndCost: {
      currentLabour: {
        roles: data.roles || [],
        totalHours: totalLabourHours,
        totalCost: totalLabourCost,
      },
      apetitoLabour: data.apetitoLabor || {
        name: "",
        hourlyRate: 0,
        hoursPerWeek: 0,
        numberOfSimilarRoles: 0
      },
    },
  };
};