import { TransformedQuoteData } from "@/components/quote-form/types";
import { QuoteFormData } from "@/components/quote-form/types";
import { ApiResponse, QuoteHistory, SavedQuote } from "@/types/quoteResponse";
import { useQueryClient } from "@tanstack/react-query";

const API_BASE_URL =
	"https://wa-quote-api-dev-gwewavh3ddace9g7.uksouth-01.azurewebsites.net/api";

export const createQuote = async (
	quoteData: QuoteFormData
): Promise<SavedQuote> => {
	try {
		const response = await fetch(`${API_BASE_URL}/quote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				accept: "*/*",
			},
			body: JSON.stringify(quoteData, null, 2),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error("API Error Response:", {
				status: response.status,
				statusText: response.statusText,
				body: errorText,
			});
			throw new Error(`API error: ${response.status} ${response.statusText}`);
		}

		const result: ApiResponse<SavedQuote> = await response.json();
		return result.data;
	} catch (error) {
		console.error("Error creating quote:", error);
		throw error;
	}
};

export const getAllQuotes = async (): Promise<SavedQuote[]> => {
	try {
		const response = await fetch(`${API_BASE_URL}/quote`, {
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch quotes");
		}

		const data: ApiResponse<SavedQuote[]> = await response.json();
		return data.data;
	} catch (error) {
		console.error("Error fetching quotes:", error);
		throw error;
	}
};

export const getQuoteById = async (id: number): Promise<QuoteFormData> => {
	try {
		const response = await fetch(`${API_BASE_URL}/quote/${id}`, {
			headers: {
				Accept: "application/json",
			},
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
			method: "DELETE",
			headers: {
				Accept: "application/json",
			},
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

export const saveQuote = async (
	id: number,
	quoteStatus: string
): Promise<void> => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/quote/${id}/updatestatus?quoteStatus=${quoteStatus}`,
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to delete quote ${id}`);
		}

		const data: ApiResponse<boolean> = await response.json();
		if (!data.success) {
			throw new Error(data.message);
		}
	} catch (error) {
		console.error(`Error updating status for quote ${id}:`, error);
		throw error;
	}
};

export const updateQuoteById = async (
	id: number,
	quoteData: QuoteFormData
): Promise<QuoteFormData> => {
	try {
		const response = await fetch(`${API_BASE_URL}/quote/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				accept: "*/*",
			},
			body: JSON.stringify(quoteData, null, 2),
		});

		if (!response.ok) {
			throw new Error(`Failed to update quote ${id}`);
		}

		const data: ApiResponse<QuoteFormData> = await response.json();
		return data.data;
	} catch (error) {
		console.error(`Error fetching quote ${id}:`, error);
		throw error;
	}
};

export const getQuoteHistoryById = async (
	id: number
): Promise<QuoteHistory[]> => {
	try {
		const response = await fetch(`${API_BASE_URL}/quote/${id}/history`, {
			method: "GET",
			headers: {
				accept: "*/*",
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to get quote history ${id}`);
		}

		const data: ApiResponse<QuoteHistory[]> = await response.json();
		return data.data;
	} catch (error) {
		console.error(`Error fetching quote history ${id}:`, error);
		throw error;
	}
};

export const submitQuoteToHubSpot = async (
	quoteId: number,
	versionNumber: number,
	recordId: string
): Promise<void> => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/quote/${quoteId}/hubspot?recordId=${recordId}&versionNumber=${versionNumber}`,

			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (!response.ok) {
			throw new Error("Failed to submit quote to HubSpot");
		}
		return response.json();
	} catch (error) {
		console.error("Error submitting quote to HubSpot:", error);
		throw error;
	}
};
