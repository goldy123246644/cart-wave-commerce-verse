
import { Product, Category } from '@/types/product';

// Mock data for products
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Modern Minimalist Desk Lamp",
    description: "Elegant desk lamp with adjustable brightness, perfect for your workspace or bedside table.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Home Decor",
    featured: true,
    rating: 4.8,
    stock: 45,
    tags: ["lighting", "desk", "modern"],
    discount: 15,
    primeEligible: true,
    reviews: 234,
    sellerName: "Modern Home",
    options: [
      {
        name: "Color",
        values: ["Black", "White", "Silver"]
      },
      {
        name: "Power Type",
        values: ["Plug-in", "Battery", "USB"]
      }
    ]
  },
  {
    id: 2,
    name: "Premium Wireless Headphones",
    description: "High-fidelity sound with noise cancellation technology for an immersive audio experience.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Electronics",
    featured: true,
    rating: 4.9,
    stock: 28,
    tags: ["audio", "wireless", "premium"],
    discount: 20,
    primeEligible: true,
    reviews: 1873,
    sellerName: "AudioTech",
    options: [
      {
        name: "Color",
        values: ["Black", "White", "Blue"]
      }
    ]
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    description: "Soft, breathable t-shirt made from 100% organic cotton for everyday comfort.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2664&q=80",
    category: "Clothing",
    rating: 4.5,
    stock: 120,
    tags: ["clothing", "sustainable", "casual"],
    primeEligible: true,
    reviews: 649,
    sellerName: "EcoWear",
    options: [
      {
        name: "Size",
        values: ["S", "M", "L", "XL"]
      },
      {
        name: "Color",
        values: ["Black", "White", "Gray", "Blue"]
      }
    ]
  },
  {
    id: 4,
    name: "Leather Weekender Bag",
    description: "Stylish leather travel bag with multiple compartments, perfect for short trips or gym sessions.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Accessories",
    featured: true,
    rating: 4.7,
    stock: 15,
    tags: ["travel", "leather", "premium"],
    discount: 10,
    primeEligible: true,
    reviews: 387,
    sellerName: "LeatherCraft",
    options: [
      {
        name: "Color",
        values: ["Brown", "Black", "Tan"]
      }
    ]
  },
  {
    id: 5,
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2399&q=80",
    category: "Electronics",
    rating: 4.6,
    stock: 32,
    tags: ["wearable", "fitness", "smartwatch"],
    primeEligible: true,
    reviews: 1205,
    sellerName: "TechFit",
    options: [
      {
        name: "Band Color",
        values: ["Black", "Blue", "Pink", "Green"]
      }
    ]
  },
  {
    id: 6,
    name: "Ceramic Plant Pot Set",
    description: "Set of 3 handcrafted ceramic pots in varying sizes, perfect for your indoor plants.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Home Decor",
    rating: 4.3,
    stock: 22,
    tags: ["home", "plants", "decor"],
    discount: 25,
    primeEligible: false,
    reviews: 142,
    sellerName: "GreenHome",
    options: [
      {
        name: "Set Size",
        values: ["3 Pieces", "5 Pieces"]
      }
    ]
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle",
    description: "Insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours. Eco-friendly and durable.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Accessories",
    rating: 4.4,
    stock: 65,
    tags: ["eco-friendly", "hydration", "outdoor"],
    primeEligible: true,
    reviews: 492,
    sellerName: "EcoWare",
    options: [
      {
        name: "Size",
        values: ["16oz", "24oz", "32oz"]
      },
      {
        name: "Color",
        values: ["Silver", "Black", "Blue", "Red"]
      }
    ]
  },
  {
    id: 8,
    name: "Artisan Coffee Maker",
    description: "Precision-engineered coffee maker with temperature control for the perfect brew every time.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1521649415036-659258dc424f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Kitchen",
    featured: true,
    rating: 4.7,
    stock: 18,
    tags: ["coffee", "kitchen", "premium"],
    discount: 5,
    primeEligible: true,
    reviews: 826,
    sellerName: "CuisineElite",
    options: [
      {
        name: "Color",
        values: ["Black", "Silver", "White"]
      },
      {
        name: "Size",
        values: ["Standard", "Large"]
      }
    ]
  },
  {
    id: 9,
    name: "Professional Chef Knife",
    description: "High-carbon stainless steel chef knife with ergonomic handle, perfect for professional or home kitchens.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Kitchen",
    rating: 4.8,
    stock: 42,
    tags: ["kitchen", "cooking", "tools"],
    primeEligible: true,
    reviews: 357,
    sellerName: "CuisineElite"
  },
  {
    id: 10,
    name: "Smart LED TV 55-inch",
    description: "4K Ultra HD smart TV with built-in streaming apps and voice control for an immersive viewing experience.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Electronics",
    featured: true,
    rating: 4.6,
    stock: 12,
    tags: ["tv", "entertainment", "smart home"],
    discount: 15,
    primeEligible: true,
    reviews: 932,
    sellerName: "TechElectronics",
    options: [
      {
        name: "Screen Size",
        values: ["43-inch", "55-inch", "65-inch"]
      }
    ]
  },
  {
    id: 11,
    name: "Ergonomic Office Chair",
    description: "Adjustable office chair with lumbar support and breathable mesh back for all-day comfort.",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1505843490311-6b5be2c2626f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Furniture",
    rating: 4.5,
    stock: 24,
    tags: ["office", "chair", "ergonomic"],
    primeEligible: true,
    reviews: 517,
    sellerName: "ErgoPro",
    options: [
      {
        name: "Color",
        values: ["Black", "Gray", "Blue"]
      }
    ]
  },
  {
    id: 12,
    name: "Bluetooth Portable Speaker",
    description: "Waterproof Bluetooth speaker with 20-hour battery life and exceptional sound quality.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2343&q=80",
    category: "Electronics",
    rating: 4.7,
    stock: 38,
    tags: ["audio", "bluetooth", "portable"],
    discount: 20,
    primeEligible: true,
    reviews: 789,
    sellerName: "AudioTech",
    options: [
      {
        name: "Color",
        values: ["Black", "Blue", "Red", "Green"]
      }
    ]
  }
];

// Mock categories
const mockCategories: Category[] = [
  {
    id: "home-decor",
    name: "Home Decor",
    description: "Stylish accessories to elevate your living space",
    image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80"
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "The latest gadgets and tech accessories",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Comfortable, stylish apparel for everyday wear",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Essential accessories to complete your look",
    image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: "kitchen",
    name: "Kitchen",
    description: "Quality tools for cooking enthusiasts",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2568&q=80"
  },
  {
    id: "furniture",
    name: "Furniture",
    description: "Stylish and functional furniture for every room",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: "books",
    name: "Books",
    description: "Bestsellers, new releases, and classics",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: "toys",
    name: "Toys & Games",
    description: "Fun and educational toys for all ages",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  }
];

// Simulate API calls with delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async (): Promise<Product[]> => {
  await delay(500); // Simulate network delay
  return mockProducts;
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  await delay(400);
  return mockProducts.find(product => product.id === id);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await delay(500);
  return mockProducts.filter(product => product.featured);
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await delay(500);
  return mockProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getCategories = async (): Promise<Category[]> => {
  await delay(500);
  return mockCategories;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  await delay(500);
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getDiscountedProducts = async (): Promise<Product[]> => {
  await delay(500);
  return mockProducts.filter(product => product.discount && product.discount > 0);
};

export const getPrimeProducts = async (): Promise<Product[]> => {
  await delay(500);
  return mockProducts.filter(product => product.primeEligible);
};

export const getTopRatedProducts = async (): Promise<Product[]> => {
  await delay(500);
  return [...mockProducts].sort((a, b) => b.rating - a.rating).slice(0, 6);
};
