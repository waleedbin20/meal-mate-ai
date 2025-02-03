import { QuoteFormData } from "@/components/quote-form/types";
import { QuoteResponse } from "@/types/quoteResponse";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const fetchQuoteResponse = async (
	data: QuoteFormData
): Promise<QuoteResponse> => {
	try {
		const response = await fetch(`${API_BASE_URL}/quote/request`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": import.meta.env.VITE_API_KEY as string,
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			console.error("Error response:", response.status, response.statusText);
			throw new Error("Failed to fetch quote response");
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching quote response:", error);
		return {
			summary:
				"Sorry, something went wrong while generating the quote. Please try again.",
			quoteDetails: {
				customerName: "",
				annualFoodSavings: 0.0,
				annualLaborSavings: 0.0,
				annualTotalSavings: 0.0,
				menuOrderTotal: 0.0,
				apetitoCostResidentPerDay: 0.0,
			},
		};
	}
};

export const sendChatMessage = async (
	question: string,
	quoteResponse: QuoteResponse | null
): Promise<string> => {
	try {
		const url = new URL(`${API_BASE_URL}/quote/chat`);
		url.searchParams.append("question", question);

		const response = await fetch(url.toString(), {
			method: "POST",
			headers: {
				accept: "*/*",
				"x-api-key": import.meta.env.VITE_API_KEY as string,
			},
		});

		if (!response.ok) {
			console.error("Error response:", response.status, response.statusText);
			throw new Error("Failed to send chat message");
		}

		const data: QuoteResponse = await response.json();
		return data.summary;
	} catch (error) {
		console.error("Error sending chat message:", error);
		throw new Error("Failed to get AI response. Please try again.");
	}
};

export const clearChat = async () => {
	try {
		await fetch(`${API_BASE_URL}/quote/clear`, {
			method: "POST",
			headers: {
				accept: "*/*",
			},
		});
	} catch (error) {
		console.error("Error clearing chat:", error);
	}
};
