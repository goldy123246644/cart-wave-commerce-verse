
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
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
