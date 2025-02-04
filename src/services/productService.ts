const API_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export interface ApiProduct {
  id: number;
  multiProductCode: string;
  twinProductCode: string;
  multiStandardPortion: number;
  twinStandardPortion: number;
  multiLargePortion: number;
  twinLargePortion: number;
  createdDate: string;
  modifiedDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const fetchProducts = async (): Promise<ApiResponse<ApiProduct[]>> => {
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

export const uploadProducts = async (file: File): Promise<ApiResponse<boolean>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        // Note: Don't set Content-Type header when using FormData
        // The browser will set it automatically with the correct boundary
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Upload error response:', errorData);
      throw new Error('Failed to upload products');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading products:', error);
    throw error;
  }
};