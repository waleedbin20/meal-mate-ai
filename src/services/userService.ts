import { User } from "@/components/quote-form/types";
import { ApiResponse } from "@/types/quoteResponse";

const API_BASE_URL =
	"https://wa-quote-api-dev-gwewavh3ddace9g7.uksouth-01.azurewebsites.net/api";

export const createUser = async (userData: User): Promise<User> => {
	try {
		const response = await fetch(`${API_BASE_URL}/user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				accept: "*/*",
			},
			body: JSON.stringify(userData, null, 2),
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

		const result: ApiResponse<User> = await response.json();
		return result.data;
	} catch (error) {
		console.error("Error creating quote:", error);
		throw error;
	}
};

export const getAllUsers = async (): Promise<User[]> => {
	try {
		const response = await fetch(`${API_BASE_URL}/user`, {
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch users");
		}

		const data: ApiResponse<User[]> = await response.json();
		return data.data;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};

export const deleteUser = async (id: number): Promise<void> => {
	try {
		const response = await fetch(`${API_BASE_URL}/user/${id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to delete user ${id}`);
		}

		const data: ApiResponse<boolean> = await response.json();
		if (!data.success) {
			throw new Error(data.message);
		}
	} catch (error) {
		console.error(`Error deleting user ${id}:`, error);
		throw error;
	}
};