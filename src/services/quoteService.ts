import { QuoteFormData } from "@/components/quote-form/types";

export const getQuoteById = async (id: number): Promise<QuoteFormData> => {
  try {
    const response = await fetch(`https://wa-quote-api-dev-gwewavh3ddace9g7.uksouth-01.azurewebsites.net/api/quote/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch quote ${id}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching quote ${id}:`, error);
    throw error;
  }
};