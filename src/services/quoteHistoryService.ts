import { QuoteHistoryResponse } from "@/types/quoteHistory";

export const fetchQuoteHistory = async (quoteId: number): Promise<QuoteHistoryResponse> => {
  try {
    const response = await fetch(
      `https://wa-quote-api-dev-gwewavh3ddace9g7.uksouth-01.azurewebsites.net/api/quote/${quoteId}/history`,
      {
        headers: {
          accept: "*/*",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch quote history");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching quote history:", error);
    throw error;
  }
};