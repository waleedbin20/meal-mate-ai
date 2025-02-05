
import { PriceData } from "@/components/pricing/types";

export interface MealPricing {
  customerId: number;
  mealType: string;
  level3: number;
  level4: number;
  level5: number;
  level6: number;
  allergenFree: number;
  fingerFoods: number;
  miniMealExtra: number;
  caribbean: number;
  halal: number;
  kosher: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchBasePrices = async (): Promise<PriceData[]> => {
  return fetchCustomerPrices(999); // Use customer ID 999 for base prices
};

export const fetchCustomerPrices = async (customerId: number): Promise<PriceData[]> => {
  console.log('Fetching customer prices for ID:', customerId);
  try {
    const response = await fetch(`${BASE_URL}/pricing/customer/${customerId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }

    const data = await response.json();
    console.log('Customer prices data:', data);
    const mappedData = mapApiResponseToPriceData(data);
    console.log('Mapped customer prices:', mappedData);
    return mappedData;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
};

export const updatePricing = async (payload: MealPricing[], customerId: number): Promise<void> => {
  const endpoint = `${BASE_URL}/pricing/customer/${customerId}`;

  console.log('Updating prices with payload:', payload);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to update prices');
  }
};

const mapApiResponseToPriceData = (apiResponse: { data: MealPricing[] }): PriceData[] => {
  console.log('Starting to map API response:', apiResponse);
  
  const categories = [
    'Level 3',
    'Level 4',
    'Level 5',
    'Level 6',
    'Allergen Free',
    'Finger Foods',
    'Mini Meal Extra',
    'Caribbean',
    'Halal',
    'Kosher'
  ];

  // Find meal type data
  const unit = apiResponse.data.find(item => item.mealType === 'Unit');
  const standard = apiResponse.data.find(item => item.mealType === 'Standard');
  const breakfast = apiResponse.data.find(item => item.mealType === 'Breakfast');
  const dessert = apiResponse.data.find(item => item.mealType === 'Dessert');
  const snack = apiResponse.data.find(item => item.mealType === 'Snacks');

  console.log('Found meal types:', {
    unit: !!unit,
    standard: !!standard,
    breakfast: !!breakfast,
    dessert: !!dessert,
    snack: !!snack
  });

  const getPriceForCategory = (item: MealPricing | undefined, field: keyof Omit<MealPricing, 'customerId' | 'mealType'>): number | null => {
    if (!item) return null;
    const value = item[field];
    return value === 0 ? null : value;
  };

  return categories.map(category => {
    const levelField = getLevelField(category);
    const unitPrice = getPriceForCategory(unit, levelField);
    
    // For Mini Meal Extra, standard price should be same as unit price
    const isMiniMealExtra = category === 'Mini Meal Extra';
    
    // Calculate standard price: if there's a standard price in API use it, otherwise calculate it from unit price
    let standardPrice: number | null;
    if (standard) {
      standardPrice = getPriceForCategory(standard, levelField);
    } else if (unitPrice !== null) {
      standardPrice = isMiniMealExtra ? unitPrice : unitPrice * 2;
    } else {
      standardPrice = null;
    }

    return {
      category,
      unitPrice,
      standardPrice,
      breakfastPrice: getPriceForCategory(breakfast, levelField),
      dessertPrice: getPriceForCategory(dessert, levelField),
      snackPrice: getPriceForCategory(snack, levelField),
    };
  });
};

const getLevelField = (category: string): keyof Omit<MealPricing, 'customerId' | 'mealType'> => {
  const map: { [key: string]: keyof Omit<MealPricing, 'customerId' | 'mealType'> } = {
    'Level 3': 'level3',
    'Level 4': 'level4',
    'Level 5': 'level5',
    'Level 6': 'level6',
    'Allergen Free': 'allergenFree',
    'Finger Foods': 'fingerFoods',
    'Mini Meal Extra': 'miniMealExtra',
    'Caribbean': 'caribbean',
    'Halal': 'halal',
    'Kosher': 'kosher'
  };
  return map[category] || 'level3';
};

