
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
  salesData?: SalesData;
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

export interface SalesData {
  monthlySales: { month: string; sales: number }[];
  weeklyProfit: { week: string; profit: number }[];
  stockHistory: { date: string; stock: number }[];
  conversion: number;
  growth: number;
}

export interface StateIndicator {
  name: string;
  value: number;
  change: number;
  status: 'positive' | 'negative' | 'neutral';
}

export interface ProfitLossData {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
}
