
export interface PriceData {
  category: string;
  unitPrice: number;
  standardPrice: number;
  breakfastPrice: number | null;
  dessertPrice: number | null;
  snackPrice: number | null;
}

export interface CustomerData {
  id: number;
  name: string;
  basePercentage: number;
}

