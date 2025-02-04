export interface ProductSize {
  size: string;
  smallEquivalent: string;
}

export interface ProductCategory {
  type: string;
  portionSizes: ProductSize[];
}

export interface Product {
  id: string;
  name: string;
  largeCode: string;
  smallCode: string;
  categories: ProductCategory[];
}