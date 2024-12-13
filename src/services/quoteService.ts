import { TransformedQuoteData } from "@/components/quote-form/types";

export const submitQuote = async (quoteData: TransformedQuoteData) => {
  // Simulating API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Quote submitted successfully",
        data: quoteData
      });
    }, 1000);
  });
};