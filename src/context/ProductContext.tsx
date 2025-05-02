import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { 
  Product, 
  RetailerOffer,
  PriceHistory, 
  PricePrediction 
} from '../types';
import { 
  getProductDetails, 
  getRetailerOffers, 
  getPriceHistory,
  getPricePrediction,
  getRelatedProducts
} from '../services/apiService';

type ProductContextType = {
  currentProduct: Product | null;
  retailerOffers: RetailerOffer[];
  priceHistory: PriceHistory[];
  pricePrediction: PricePrediction | null;
  relatedProducts: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProductDetails: (productId: string) => Promise<void>;
  getBestDeal: () => RetailerOffer | null;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [retailerOffers, setRetailerOffers] = useState<RetailerOffer[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [pricePrediction, setPricePrediction] = useState<PricePrediction | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetails = useCallback(async (productId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [product, offers, history, prediction, related] = await Promise.all([
        getProductDetails(productId),
        getRetailerOffers(productId),
        getPriceHistory(productId),
        getPricePrediction(productId),
        getRelatedProducts(productId)
      ]);
      
      setCurrentProduct(product);
      setRetailerOffers(offers);
      setPriceHistory(history);
      setPricePrediction(prediction);
      setRelatedProducts(related);
    } catch (err) {
      setError('Failed to fetch product details. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBestDeal = useCallback((): RetailerOffer | null => {
    if (retailerOffers.length === 0) return null;
    return [...retailerOffers].sort((a, b) => b.dealScore - a.dealScore)[0];
  }, [retailerOffers]);

  return (
    <ProductContext.Provider
      value={{
        currentProduct,
        retailerOffers,
        priceHistory,
        pricePrediction,
        relatedProducts,
        isLoading,
        error,
        fetchProductDetails,
        getBestDeal
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};