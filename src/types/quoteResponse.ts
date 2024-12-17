export interface QuoteResponse {
  managerQuoteApproval: boolean;
  managerQuoteSummary: string;
  quoteDetails: {
    apetitoCostResidentPerDay: number;
  };
}