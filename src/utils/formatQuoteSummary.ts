import { QuoteFormData } from "@/components/quote-form/types";
import { QuoteHistoryItem } from "@/types/quoteHistory";

export const formatQuoteSummary = (data: QuoteHistoryItem | QuoteFormData): string => {
  // If it's a QuoteHistoryItem (from history API)
  if ('type' in data) {
    if (data.type === 0) { // Request
      return `Quote Request Summary:
Care Home: ${data.careHomeName}
Total Residents: ${data.numberOfResidents}
Number of Dining Rooms: ${data.numberOfDiningRooms}
Selected Menu: ${data.selectedMenu}
Current Annual Food Spend: £${data.currentAnnualFoodSpend?.toLocaleString() || 0}
Estimated Non-Apetito Spend: £${data.estimatedNonApetitoSpend?.toLocaleString() || 0}
Current Annual Labour Cost: £${data.currentAnnualLabourCost?.toLocaleString() || 0}
Apetito Estimated Annual Labour Cost: £${data.apetitoEstimatedAnnualLabourCost?.toLocaleString() || 0}`;
    } else { // Response
      return `Quote Response Summary:
Cost per resident per day: £${data.costPerDayPerResident?.toFixed(2) || 0}
Menu order total: £${data.menuOrderTotal?.toLocaleString() || 0}
Annual labor savings: £${data.annualLaborSavings?.toLocaleString() || 0}
Annual food savings: £${data.annualFoodSavings?.toLocaleString() || 0}
Total annual savings: £${data.annualTotalSavings?.toLocaleString() || 0}`;
    }
  }

  // If it's a QuoteFormData (from form submission)
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