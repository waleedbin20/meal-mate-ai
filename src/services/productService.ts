import { Product } from "@/pages/ProductsPage";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface ApiResponse {
  data: Product[];
}

export const fetchProducts = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};