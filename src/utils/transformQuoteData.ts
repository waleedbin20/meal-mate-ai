import { QuoteFormData } from "@/components/quote-form/types";

export interface TransformedQuoteData {
  careHomeDetails: {
    name: string;
  };
  diningInformation: {
    numberOfDiningRooms: number;
    diningRooms: Array<{
      diningRoomName: string;
      residents: {
        total: number;
        categories: {
          standardResidents: number;
          level3Residents: number;
          level4Residents: number;
          level5Residents: number;
          level6Residents: number;
          allergyFreeResidents: number;
          fingerFoodResidents: number;
          miniMealResidents: number;
        };
      };
      menuInformation: {
        menuCycle: string;
        menuOfferingTier: string;
        portionSize: string;
      };
    }>;
  };
  pricingInformation: {
    priceListNumber: number;
  };
  labourAndCost: {
    labourHoursPerDay: string;
    labourCostPerYear: string;
    preApetitoPerYear: string;
    postApetitoPerYear: string;
  };
}

export const transformQuoteData = (data: QuoteFormData): TransformedQuoteData => {
  return {
    careHomeDetails: {
      name: data.careHomeName || "",
    },
    diningInformation: {
      numberOfDiningRooms: data.numberOfDiningRooms,
      diningRooms: data.diningRooms.map((room) => ({
        diningRoomName: room.name,
        residents: {
          total: room.totalResidents,
          categories: {
            standardResidents: room.standardResidents,
            level3Residents: room.level3Residents,
            level4Residents: room.level4Residents,
            level5Residents: room.level5Residents,
            level6Residents: room.level6Residents,
            allergyFreeResidents: room.allergyFreeResidents,
            fingerFoodResidents: room.fingerFoodResidents,
            miniMealResidents: room.miniMealResidents,
          },
        },
        menuInformation: {
          menuCycle: room.menuCycle,
          menuOfferingTier: room.offeringTiers[0] || "",
          portionSize: room.portionSize,
        },
      })),
    },
    pricingInformation: {
      priceListNumber: parseInt(data.priceListNumber) || 0,
    },
    labourAndCost: {
      labourHoursPerDay: data.currentLabourHours.toString(),
      labourCostPerYear: data.currentLabourCost.toString(),
      preApetitoPerYear: data.currentFoodSpend?.toString() || "0",
      postApetitoPerYear: data.estimatedNonApetitoSpend?.toString() || "0",
    },
  };
};