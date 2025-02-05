import { PriceData } from "@/components/pricing/types";

export interface MealPricing {
  customerId: number;
  mealType: 'Unit' | 'Standard' | 'Dessert' | 'Breakfast' | 'Snacks';
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
  const response = await fetch(`${BASE_URL}/pricing/baseprice`, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch base prices');
  }

  const data = await response.json();
  return mapApiResponseToPriceData(data);
};

export const fetchCustomerPrices = async (customerId: string): Promise<PriceData[]> => {
  const response = await fetch(`${BASE_URL}/pricing?customerId=${customerId}`, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch customer prices');
  }

  const data = await response.json();
  return mapApiResponseToPriceData(data);
};

export const updatePricing = async (prices: PriceData[], customerId?: string): Promise<void> => {
  const payload = prices.map(price => ({
    customerId: customerId ? parseInt(customerId) : 999,
    mealType: getMealType(price),
    level3: price.unitPrice,
    level4: price.unitPrice,
    level5: price.unitPrice,
    level6: price.unitPrice,
    allergenFree: price.unitPrice,
    fingerFoods: price.unitPrice,
    miniMealExtra: price.unitPrice,
    caribbean: price.unitPrice,
    halal: price.unitPrice,
    kosher: price.unitPrice
  }));

  const response = await fetch(`${BASE_URL}/pricing`, {
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

const getMealType = (price: PriceData): MealPricing['mealType'] => {
  if (price.snackPrice !== null) return 'Snacks';
  if (price.breakfastPrice !== null) return 'Breakfast';
  if (price.dessertPrice !== null) return 'Dessert';
  if (price.standardPrice !== null) return 'Standard';
  return 'Unit';
};

const mapApiResponseToPriceData = (apiResponse: MealPricing[]): PriceData[] => {
  const groupedByCategory = apiResponse.reduce((acc, curr) => {
    const categories = [
      { name: 'Level 3', value: curr.level3 },
      { name: 'Level 4', value: curr.level4 },
      { name: 'Level 5', value: curr.level5 },
      { name: 'Level 6', value: curr.level6 },
      { name: 'Allergen Free', value: curr.allergenFree },
      { name: 'Finger Foods', value: curr.fingerFoods },
      { name: 'Mini Meal Extra', value: curr.miniMealExtra },
      { name: 'Caribbean', value: curr.caribbean },
      { name: 'Halal', value: curr.halal },
      { name: 'Kosher', value: curr.kosher }
    ];

    categories.forEach(({ name, value }) => {
      if (!acc[name]) {
        acc[name] = {
          category: name,
          unitPrice: 0,
          standardPrice: 0,
          breakfastPrice: null,
          dessertPrice: null,
          snackPrice: null
        };
      }

      switch (curr.mealType) {
        case 'Unit':
          acc[name].unitPrice = value;
          acc[name].standardPrice = name === 'Mini Meal Extra' ? value : value * 2;
          break;
        case 'Breakfast':
          acc[name].breakfastPrice = value;
          break;
        case 'Dessert':
          acc[name].dessertPrice = value;
          break;
        case 'Snacks':
          acc[name].snackPrice = value;
          break;
      }
    });

    return acc;
  }, {} as Record<string, PriceData>);

  return Object.values(groupedByCategory);
};
