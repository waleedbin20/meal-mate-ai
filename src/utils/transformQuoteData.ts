import { QuoteFormData } from "@/components/quote-form/types";

export interface TransformedQuoteData {
  careHomeDetails: {
    name: string;
    address: string;
  };
  diningInformation: {
    numberOfDiningRooms: number;
    diningRooms: Array<{
      diningRoomName: string;
      residents: {
        total: number;
        categories: {
          standardMeals: number;
          largeMeals: number;
          allergyFreeMeals: number;
          energyDenseMeals: number;
          fingerFoodsMeals: number;
        };
      };
      menuInformation: {
        menuCycle: string;
        menuOfferingTier: string;
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
      address: data.careHomeAddress || "",
    },
    diningInformation: {
      numberOfDiningRooms: data.numberOfDiningRooms,
      diningRooms: data.diningRooms.map((room) => ({
        diningRoomName: room.name,
        residents: {
          total: room.totalResidents,
          categories: {
            standardMeals: room.standardResidents,
            largeMeals: room.largeResidents,
            allergyFreeMeals: room.allergyFreeResidents,
            energyDenseMeals: room.energyDenseResidents,
            fingerFoodsMeals: room.fingerFoodResidents,
          },
        },
        menuInformation: {
          menuCycle: room.menuCycle,
          menuOfferingTier: room.offeringTiers[0] || "", // Taking the first tier as the primary
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