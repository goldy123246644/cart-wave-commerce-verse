
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
  dimensions?: ProductDimensions;
  weight?: number;
  warrantyInfo?: string;
  returnPolicy?: string;
  shippingTime?: string;
  stockHistory?: StockHistory[];
  relatedProducts?: number[];
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

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'in' | 'cm';
}

export interface StockHistory {
  date: string;
  stock: number;
  reason?: 'purchase' | 'return' | 'adjustment' | 'inventory';
}

export interface InventoryAlert {
  productId: number;
  productName: string;
  currentStock: number;
  threshold: number;
  status: 'warning' | 'critical' | 'backorder';
  daysUntilStockout?: number;
}

export interface CustomerSegment {
  id: string;
  name: string;
  count: number;
  averageOrderValue: number;
  loyaltyScore: number;
  demographics?: {
    ageRange?: string;
    location?: string;
    gender?: string;
  };
  topCategories: { category: string; percentage: number }[];
}
