import { QuoteFormData } from "@/components/quote-form/types";
import { useQueryClient } from "@tanstack/react-query";

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
    console.log('Sending quote data:', JSON.stringify(quoteData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        data: quoteData
      })
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

    const result = await response.json();
    console.log('Quote creation response:', result);
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