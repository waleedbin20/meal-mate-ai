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
  console.log('Fetching base prices...');
  const response = await fetch(`${BASE_URL}/pricing/baseprice`, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch base prices:', response.status, response.statusText);
    throw new Error('Failed to fetch base prices');
  }

  const data = await response.json();
  console.log('Base prices data:', data);
  const mappedData = mapApiResponseToPriceData(data);
  console.log('Mapped base prices:', mappedData);
  return mappedData;
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
      // If customer prices are not found, fall back to base prices
      if (response.status === 404) {
        console.log('Customer prices not found, falling back to base prices');
        return fetchBasePrices();
      }
      throw new Error('Failed to fetch customer prices');
    }

    const data = await response.json();
    console.log('Customer prices data:', data);
    const mappedData = mapApiResponseToPriceData(data);
    console.log('Mapped customer prices:', mappedData);
    return mappedData;
  } catch (error) {
    console.error('Error fetching customer prices:', error);
    // Fall back to base prices on any error
    return fetchBasePrices();
  }
};

export const updatePricing = async (prices: PriceData[], customerId?: number): Promise<void> => {
  const payload = prices.map(price => ({
    customerId: customerId || 999,
    mealType: getMealType(price),
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

const getMealType = (price: PriceData): string => {
  switch (price.category.toLowerCase()) {
    case 'level 3':
    case 'level 4':
    case 'level 5':
    case 'level 6':
    case 'allergen free':
    case 'finger foods':
    case 'mini meal extra':
    case 'caribbean':
    case 'halal':
    case 'kosher':
      return 'BaseUnit';
    case 'breakfast':
      return 'BaseBreakfast';
    case 'dessert':
      return 'BaseDessert';
    case 'snack':
      return 'BaseSnack';
    default:
      return 'BaseUnit';
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

  const baseUnit = apiResponse.data.find(item => item.mealType === 'BaseUnit');
  const baseBreakfast = apiResponse.data.find(item => item.mealType === 'BaseBreakfast');
  const baseDessert = apiResponse.data.find(item => item.mealType === 'BaseDessert');
  const baseSnack = apiResponse.data.find(item => item.mealType === 'BaseSnack');

  console.log('Found meal types:', {
    baseUnit: !!baseUnit,
    baseBreakfast: !!baseBreakfast,
    baseDessert: !!baseDessert,
    baseSnack: !!baseSnack
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
    unitPrice: getPriceForCategory(baseUnit, category),
    standardPrice: getPriceForCategory(baseUnit, category) * 2,
    breakfastPrice: baseBreakfast ? getPriceForCategory(baseBreakfast, category) : null,
    dessertPrice: baseDessert ? getPriceForCategory(baseDessert, category) : null,
    snackPrice: baseSnack ? getPriceForCategory(baseSnack, category) : null,
  }));

  console.log('Mapped result:', result);
  return result;
};
