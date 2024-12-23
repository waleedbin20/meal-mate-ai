import { QuoteFormData } from "@/components/quote-form/types";
import { QuoteResponse } from "@/types/quoteResponse";

export const fetchQuoteResponse = async (data: QuoteFormData): Promise<QuoteResponse> => {
  try {
    const response = await fetch('https://quoteaiapi-cfe5abfdcuf7gqgd.uksouth-01.azurewebsites.net/api/quote/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Error response:', response.status, response.statusText);
      throw new Error('Failed to fetch quote response');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching quote response:', error);
    return {
      managerQuoteApproval: false,
      managerQuoteSummary: "Sorry, something went wrong while generating the quote. Please try again.",
      quoteDetails: {
        apetitoCostResidentPerDay: 0.0
      }
    };
  }
};