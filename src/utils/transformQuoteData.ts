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
          multiTwinLargeResidents: number;
          multiTwinSmallResidents: number;
          multiTwinStandardResidents: number;
          level3Residents: number;
          level4Residents: number;
          level5Residents: number;
          level6Residents: number;
          allergyFreeResidents: number;
          fingerFoodResidents: number;
          miniMealResidents: number;
          religiousDietsResidents: number;
        };
      };
      menuInformation: {
        menuName: string;
        menuId: string;
        portionSize?: string;
      };
    }>;
  };
  pricingInformation: {
    priceListName: {
      customerNo: string;
      priceHierarchy: string;
    };
  };
  labourAndCost: {
    currentLabour: {
      role1: {
        hourlyRate: string;
        hoursPerWeek: string;
      };
      role2: {
        hourlyRate: string;
        hoursPerWeek: string;
      };
      role3: {
        hourlyRate: string;
        hoursPerWeek: string;
      };
    };
    apetitoLabour: {
      hourlyRate: string;
      hoursPerWeek: string;
    };
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
            multiTwinLargeResidents: room.multiTwinLargeResidents,
            multiTwinSmallResidents: room.multiTwinSmallResidents,
            multiTwinStandardResidents: room.multiTwinStandardResidents,
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
          portionSize: room.portionSize,
        },
      })),
    },
    pricingInformation: {
      priceListName: data.priceListName,
    },
    labourAndCost: {
      currentLabour: {
        role1: {
          hourlyRate: data.role1.hourlyRate.toString(),
          hoursPerWeek: data.role1.hoursPerWeek.toString(),
        },
        role2: {
          hourlyRate: data.role2.hourlyRate.toString(),
          hoursPerWeek: data.role2.hoursPerWeek.toString(),
        },
        role3: {
          hourlyRate: data.role3.hourlyRate.toString(),
          hoursPerWeek: data.role3.hoursPerWeek.toString(),
        },
      },
      apetitoLabour: {
        hourlyRate: data.apetitoLabor.hourlyRate.toString(),
        hoursPerWeek: data.apetitoLabor.hoursPerWeek.toString(),
      },
      preApetitoPerYear: data.currentFoodSpend?.toString() || "0",
      postApetitoPerYear: data.estimatedNonApetitoSpend?.toString() || "0",
    },
  };
};