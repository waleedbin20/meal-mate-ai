export interface QuoteResponse {
  managerQuoteApproval: boolean;
  managerQuoteSummary: string;
  quoteDetails: {
    customerName: string;
    apetitoCostResidentPerDay: number;
    menuOrderTotal: number;
    annualLaborSavings: number;
    annualFoodSavings: number;
    annualTotalSavings: number;
  };
}