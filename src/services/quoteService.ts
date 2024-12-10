import { TransformedQuoteData } from "@/utils/transformQuoteData";

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