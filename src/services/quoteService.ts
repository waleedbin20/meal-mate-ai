import type { QuoteFormData } from "@/components/quote-form/types";

export const getQuoteById = async (id: number): Promise<QuoteFormData> => {
    try {
        const response = await fetch(`https://wa-quote-api-dev-gwewavh3ddace9g7.uksouth-01.azurewebsites.net/api/quote/${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error;
    }
};