import { QuoteFormData } from "@/components/quote-form/types";

const API_BASE_URL = 'https://wa-quote-api-dev-gwewavh3ddace9g7.uksouth-01.azurewebsites.net/api';

export interface SavedQuote {
  id: number;
  creatorName: string;
  createdOn: string;
  careHomeName: string;
  totalResidents: number;
  quoteStatus: string;
  quoteNo: string;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  errors: null | any;
}

export const createQuote = async (quoteData: QuoteFormData): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteData),
    });

    if (!response.ok) {
      throw new Error('Failed to create quote');
    }
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error;
  }
};

export const getAllQuotes = async (): Promise<SavedQuote[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quote`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }

    const data: ApiResponse<SavedQuote[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};