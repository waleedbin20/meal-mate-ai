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
        customerName: "",
        apetitoCostResidentPerDay: 0,
        menuOrderTotal: 0,
        annualLaborSavings: 0,
        annualFoodSavings: 0,
        annualTotalSavings: 0
      }
    };
  }
};

export const sendChatMessage = async (question: string, quoteResponse: QuoteResponse | null): Promise<string> => {
  try {
    const url = new URL('https://quoteaiapi-cfe5abfdcuf7gqgd.uksouth-01.azurewebsites.net/api/quote/chat');
    url.searchParams.append('question', question);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'accept': '*/*'
      }
    });

    if (!response.ok) {
      console.error('Error response:', response.status, response.statusText);
      throw new Error('Failed to send chat message');
    }

    const data: QuoteResponse = await response.json();
    return data.managerQuoteSummary;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw new Error('Failed to get AI response. Please try again.');
  }
};

export const clearChat = async () => {
  try {
    await fetch('https://quoteaiapi-cfe5abfdcuf7gqgd.uksouth-01.azurewebsites.net/api/quote/clear', {
      method: 'POST',
      headers: {
        'accept': '*/*'
      }
    });
  } catch (error) {
    console.error('Error clearing chat:', error);
  }
};
