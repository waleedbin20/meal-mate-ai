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

export const getLatestQuote = async (): Promise<SavedQuote> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quote`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }

    const data: ApiResponse<SavedQuote[]> = await response.json();
    // Get the most recent quote
    const quotes = data.data;
    if (!quotes || quotes.length === 0) {
      throw new Error('No quotes found');
    }
    return quotes[0]; // Return the most recent quote
  } catch (error) {
    console.error('Error fetching latest quote:', error);
    throw error;
  }
};

export const createQuote = async (quoteData: QuoteFormData): Promise<SavedQuote> => {
  try {
    console.log('Sending quote data:', JSON.stringify(quoteData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(quoteData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result: ApiResponse<boolean> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to create quote');
    }

    // Get the newly created quote
    const newQuote = await getLatestQuote();
    return newQuote;
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error;
  }
};

export const getAllQuotes = async (): Promise<SavedQuote[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quote`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
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

export const getQuoteById = async (id: number): Promise<QuoteFormData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quote/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch quote ${id}`);
    }

    const data: ApiResponse<QuoteFormData> = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching quote ${id}:`, error);
    throw error;
  }
};

export const deleteQuote = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/quote/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete quote ${id}`);
    }

    const data: ApiResponse<boolean> = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(`Error deleting quote ${id}:`, error);
    throw error;
  }
};
