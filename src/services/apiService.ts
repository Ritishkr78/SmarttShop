import { mockProducts, mockRetailers, generateMockPriceHistory, generateMockPrediction } from './mockData';
import type { 
  Product, 
  RetailerOffer, 
  PriceHistory, 
  PricePrediction, 
  SearchResult,
  SearchFilters,
  ProductInsight,
  DemandTrend
} from '../types';

// Product related API calls
export const getProductDetails = async (productId: string): Promise<Product> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    throw new Error('Product not found');
  }
  
  return product;
};

export const getRetailerOffers = async (productId: string): Promise<RetailerOffer[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return mockRetailers
    .filter(r => r.productId === productId)
    .sort((a, b) => a.price - b.price);
};

export const getPriceHistory = async (productId: string): Promise<PriceHistory[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return generateMockPriceHistory(productId);
};

export const getPricePrediction = async (productId: string): Promise<PricePrediction> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return generateMockPrediction(productId);
};

export const getRelatedProducts = async (productId: string): Promise<Product[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const currentProduct = mockProducts.find(p => p.id === productId);
  if (!currentProduct) {
    return [];
  }
  
  // Return products in the same category
  return mockProducts
    .filter(p => p.category === currentProduct.category && p.id !== productId)
    .slice(0, 4);
};

// Search related API calls
export const searchProducts = async (
  query: string, 
  filters: SearchFilters = {}
): Promise<SearchResult> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Apply very basic filtering for the mock implementation
  let filteredProducts = [...mockProducts];
  
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filteredProducts = filteredProducts.filter(
      p => p.name.toLowerCase().includes(lowercaseQuery) || 
           p.description.toLowerCase().includes(lowercaseQuery) ||
           p.brand.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }
  
  if (filters.brand && filters.brand.length > 0) {
    filteredProducts = filteredProducts.filter(
      p => filters.brand?.some(b => p.brand.toLowerCase() === b.toLowerCase())
    );
  }
  
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      p => p.lowestPrice >= (filters.minPrice || 0)
    );
  }
  
  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      p => p.lowestPrice <= (filters.maxPrice || Infinity)
    );
  }
  
  if (filters.rating !== undefined) {
    filteredProducts = filteredProducts.filter(
      p => p.averageRating >= (filters.rating || 0)
    );
  }
  
  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.lowestPrice - b.lowestPrice);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.lowestPrice - a.lowestPrice);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'popularity':
        // For mock data, just use review count as a proxy for popularity
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
  }
  
  // Generate category filters
  const categories = Array.from(new Set(mockProducts.map(p => p.category))).map(
    category => ({
      name: category,
      count: mockProducts.filter(p => p.category === category).length
    })
  );
  
  // Generate brand filters
  const brands = Array.from(new Set(mockProducts.map(p => p.brand))).map(
    brand => ({
      name: brand,
      count: mockProducts.filter(p => p.brand === brand).length
    })
  );
  
  // Generate price range filters
  const priceRanges = [
    { min: 0, max: 1000, count: mockProducts.filter(p => p.lowestPrice <= 1000).length },
    { min: 1000, max: 5000, count: mockProducts.filter(p => p.lowestPrice > 1000 && p.lowestPrice <= 5000).length },
    { min: 5000, max: 10000, count: mockProducts.filter(p => p.lowestPrice > 5000 && p.lowestPrice <= 10000).length },
    { min: 10000, max: 50000, count: mockProducts.filter(p => p.lowestPrice > 10000 && p.lowestPrice <= 50000).length },
    { min: 50000, max: Infinity, count: mockProducts.filter(p => p.lowestPrice > 50000).length }
  ];
  
  return {
    products: filteredProducts,
    total: filteredProducts.length,
    page: 1,
    pageSize: filteredProducts.length,
    filters: {
      categories,
      brands,
      priceRanges
    }
  };
};

export const getSuggestions = async (query: string): Promise<string[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!query) {
    return [];
  }
  
  const lowercaseQuery = query.toLowerCase();
  
  // Get matching product names
  const matchingProducts = mockProducts
    .filter(p => p.name.toLowerCase().includes(lowercaseQuery))
    .map(p => p.name);
  
  // Get matching brands
  const matchingBrands = Array.from(new Set(mockProducts.map(p => p.brand)))
    .filter(brand => brand.toLowerCase().includes(lowercaseQuery))
    .map(brand => brand);
  
  // Get matching categories
  const matchingCategories = Array.from(new Set(mockProducts.map(p => p.category)))
    .filter(category => category.toLowerCase().includes(lowercaseQuery))
    .map(category => category);
  
  // Combine all suggestions and limit to top 10
  return [...matchingProducts, ...matchingBrands, ...matchingCategories]
    .filter((value, index, self) => self.indexOf(value) === index)
    .slice(0, 10);
};

// Admin dashboard related API calls
export const getProductInsights = async (): Promise<ProductInsight[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock product insights
  return mockProducts.slice(0, 10).map(product => ({
    productId: product.id,
    productName: product.name,
    viewCount: Math.floor(Math.random() * 10000),
    clickCount: Math.floor(Math.random() * 5000),
    conversionRate: Math.random() * 0.2,
    priceChanges: Math.floor(Math.random() * 20)
  }));
};

export const getDemandTrends = async (): Promise<DemandTrend[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const trends: DemandTrend[] = [];
  const categories = Array.from(new Set(mockProducts.map(p => p.category)));
  
  // Generate data for the last 30 days
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    for (const category of categories) {
      trends.push({
        date: dateString,
        searchVolume: Math.floor(Math.random() * 1000),
        category
      });
    }
  }
  
  return trends;
};