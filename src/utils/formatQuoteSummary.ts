import { QuoteFormData } from "@/components/quote-form/types";

export const formatQuoteSummary = (data: QuoteFormData): string => {
  return `Create me a Quote for:
Care Home: ${data.careHomeName}
Total Residents: ${data.totalResidents}
Number of Dining Rooms: ${data.numberOfDiningRooms}
Selected Menu: ${data.selectedMenu?.menuName || 'Not selected'}
Current Labour Hours: ${data.currentLabourHours} per day
Current Labour Cost: £${data.currentLabourCost.toLocaleString()} per year
Current Food Spend: £${data.currentFoodSpend.toLocaleString()} per year
Estimated Non-Apetito Spend: £${data.estimatedNonApetitoSpend.toLocaleString()} per year`;
};