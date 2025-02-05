
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

export const updatePricing = async (prices: PriceData[], customerId?: number): Promise<void> => {
  const endpoint = customerId ? `${BASE_URL}/pricing/customer/${customerId}` : `${BASE_URL}/pricing/customer/999`;

  const payload = prices.map(price => ({
    customerId: customerId || 999,
    mealType: getMealType(price.category),
    level3: price.unitPrice,
    level4: price.standardPrice,
    level5: price.unitPrice,
    level6: price.unitPrice,
    allergenFree: price.unitPrice,
    fingerFoods: price.unitPrice,
    miniMealExtra: price.unitPrice,
    caribbean: price.unitPrice,
    halal: price.unitPrice,
    kosher: price.unitPrice
  }));

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

const getMealType = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'Level 3': 'Unit',
    'Level 4': 'Unit',
    'Level 5': 'Unit',
    'Level 6': 'Unit',
    'Allergen Free': 'Unit',
    'Finger Foods': 'Unit',
    'Mini Meal Extra': 'Unit',
    'Caribbean': 'Unit',
    'Halal': 'Unit',
    'Kosher': 'Unit',
    'Breakfast': 'Breakfast',
    'Dessert': 'Dessert',
    'Snack': 'Snacks'
  };

  return categoryMap[category] || 'Unit';
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

  const unit = apiResponse.data.find(item => item.mealType === 'Unit');
  const breakfast = apiResponse.data.find(item => item.mealType === 'Breakfast');
  const dessert = apiResponse.data.find(item => item.mealType === 'Dessert');
  const snack = apiResponse.data.find(item => item.mealType === 'Snacks');

  console.log('Found meal types:', {
    unit: !!unit,
    breakfast: !!breakfast,
    dessert: !!dessert,
    snack: !!snack
  });

  const getPriceForCategory = (item: MealPricing | undefined, category: string): number => {
    if (!item) return 0;
    switch (category.toLowerCase()) {
      case 'level 3': return item.level3;
      case 'level 4': return item.level4;
      case 'level 5': return item.level5;
      case 'level 6': return item.level6;
      case 'allergen free': return item.allergenFree;
      case 'finger foods': return item.fingerFoods;
      case 'mini meal extra': return item.miniMealExtra;
      case 'caribbean': return item.caribbean;
      case 'halal': return item.halal;
      case 'kosher': return item.kosher;
      default: return 0;
    }
  };

  const result = categories.map(category => ({
    category,
    unitPrice: getPriceForCategory(unit, category),
    standardPrice: getPriceForCategory(unit, category) * 2,
    breakfastPrice: breakfast ? getPriceForCategory(breakfast, category) : null,
    dessertPrice: dessert ? getPriceForCategory(dessert, category) : null,
    snackPrice: snack ? getPriceForCategory(snack, category) : null,
  }));

  console.log('Mapped result:', result);
  return result;
};

