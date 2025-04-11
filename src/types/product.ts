
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  rating: number;
  stock: number;
  tags?: string[];
  discount?: number;
  primeEligible?: boolean;
  reviews?: number;
  sellerId?: string;
  sellerName?: string;
  options?: ProductOption[];
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
