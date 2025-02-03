import { QuoteFormData, TransformedQuoteData } from "@/components/quote-form/types";

export const transformQuoteData = (data: QuoteFormData): TransformedQuoteData => {
  return {
    ...data,
    currentAnnualFoodSpend: data.currentFoodSpend,
    apetitoEstimatedAnnualLabourCost: 0 // This should be calculated based on your business logic
  };
};