import { QuoteFormData, TransformedQuoteData } from "@/components/quote-form/types";

export const transformQuoteData = (data: QuoteFormData): TransformedQuoteData => {
  const totalLabourHours = data.role1.hoursPerWeek + data.role2.hoursPerWeek + data.role3.hoursPerWeek;
  const totalLabourCost = 
    (data.role1.hourlyRate * data.role1.hoursPerWeek * 52) +
    (data.role2.hourlyRate * data.role2.hoursPerWeek * 52) +
    (data.role3.hourlyRate * data.role3.hoursPerWeek * 52);

  return {
    careHomeDetails: {
      name: data.careHomeName,
    },
    diningInformation: {
      numberOfDiningRooms: data.numberOfDiningRooms,
      diningRooms: data.diningRooms.map((room) => ({
        diningRoomName: room.name,
        residents: {
          total: data.totalResidents,
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
            religiousDietsResidents: room.religiousDietsResidents,
          },
        },
        menuInformation: {
          menuName: room.selectedMenu.menuName,
          menuId: room.selectedMenu.menuId,
        },
      })),
    },
    pricingInformation: {
      priceListName: data.priceListName,
      currentFoodSpend: data.currentFoodSpend,
      estimatedNonApetitoSpend: data.estimatedNonApetitoSpend,
    },
    labourAndCost: {
      currentLabour: {
        role1: data.role1,
        role2: data.role2,
        role3: data.role3,
        totalHours: totalLabourHours,
        totalCost: totalLabourCost,
      },
      apetitoLabour: data.apetitoLabor,
    },
  };
};