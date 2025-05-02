// Product Types
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  specifications: Record<string, string>;
  averageRating: number;
  reviewCount: number;
  lowestPrice: number;
  highestPrice: number;
}

export interface RetailerOffer {
  id: string;
  retailerId: string;
  retailerName: string;
  retailerLogo: string;
  productId: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock: boolean;
  deliveryTime: string;
  deliveryFee: number;
  dealScore: number;
  productUrl: string;
  rating: number;
  freeShipping: boolean;
}

export interface PriceHistory {
  date: string; // ISO date string
  price: number;
  retailerId: string;
  retailerName: string;
}

export interface PricePrediction {
  dates: string[]; // Array of ISO date strings
  prices: number[]; // Array of predicted prices
  confidence: {
    upper: number[];
    lower: number[];
  };
  lowestPredictedPrice: number;
  lowestPredictedDate: string;
  priceDropPercentage: number;
}

// Search Types
export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  filters: {
    categories: { name: string; count: number }[];
    brands: { name: string; count: number }[];
    priceRanges: { min: number; max: number; count: number }[];
  };
}

export interface SearchFilters {
  category?: string;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'popularity';
}

// User Related Types
export interface UserPreference {
  id: string;
  userId: string;
  category: string;
  brand: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

// Admin Dashboard Types
export interface ProductInsight {
  productId: string;
  productName: string;
  viewCount: number;
  clickCount: number;
  conversionRate: number;
  priceChanges: number;
}

export interface DemandTrend {
  date: string;
  searchVolume: number;
  category: string;
}