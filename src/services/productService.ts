import { Product } from "@/pages/ProductsPage";

const API_URL = 'https://wa-quote-api-dev-gwewavh3ddace9g7.uksouth-01.azurewebsites.net/api';

export const fetchProducts = async (token: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      headers: {
        'x-api-key': token,
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