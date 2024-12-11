import { QuoteFormData } from "@/components/quote-form/types";

export const formatQuoteSummary = (data: QuoteFormData): string => {
  const totalResidents = data.diningRooms.reduce((sum, room) => sum + room.totalResidents, 0);
  
  return `Summary of Quote Request:
Care Home: ${data.careHomeName}
Total Residents: ${totalResidents}
Number of Dining Rooms: ${data.numberOfDiningRooms}
Menu Cycle: ${data.menuCycle} weeks
Current Labour Hours: ${data.currentLabourHours} per day
Current Labour Cost: £${data.currentLabourCost.toLocaleString()} per year
Current Food Spend: £${data.currentFoodSpend.toLocaleString()} per year
Estimated Non-Apetito Spend: £${data.estimatedNonApetitoSpend.toLocaleString()} per year`;
};