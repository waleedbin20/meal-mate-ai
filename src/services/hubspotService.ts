import { ApiResponse } from "@/types/quoteResponse";

interface HubspotSubmitResponse {
  success: boolean;
  message: string;
}

export const submitQuoteToHubspot = async (quoteId: number, recordId: string, version: number): Promise<HubspotSubmitResponse> => {
  try {
    const response = await fetch(`https://wa-quote-api-dev-gwewavh3ddace9g7.uksouth-01.azurewebsites.net/api/quote/${quoteId}/hubspot?recordId=${recordId}&version=${version}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to submit quote to HubSpot");
    }

    const data: ApiResponse<HubspotSubmitResponse> = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error submitting quote to HubSpot:", error);
    throw error;
  }
};