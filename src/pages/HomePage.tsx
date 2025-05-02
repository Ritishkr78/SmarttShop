import React, { useState, useEffect } from 'react';
import { ShoppingBag, TrendingUp, Zap, Search } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { searchProducts } from '../services/apiService';
import type { Product } from '../types';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [bestDeals, setBestDeals] = useState<Product[]>([]);
  const [dealScores, setDealScores] = useState<Record<string, number>>({});
  const [priceTrends, setPriceTrends] = useState<Record<string, {
    percentage: number;
    direction: 'up' | 'down' | 'stable';
  }>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Get featured products (all products for demo)
        const result = await searchProducts('');
        setFeaturedProducts(result.products.slice(0, 4));
        
        // Get trending products (sort by review count as proxy for popularity)
        const trendingResult = [...result.products].sort((a, b) => b.reviewCount - a.reviewCount);
        setTrendingProducts(trendingResult.slice(0, 4));
        
        // Get best deals (we'll use the first 4 products and add deal scores)
        const dealsResult = result.products.slice(0, 4);
        setBestDeals(dealsResult);
        
        // Generate mock deal scores
        const mockDealScores: Record<string, number> = {};
        dealsResult.forEach(product => {
          mockDealScores[product.id] = 7 + Math.random() * 3; // Random score between 7-10
        });
        setDealScores(mockDealScores);
        
        // Generate mock price trends
        const mockPriceTrends: Record<string, {
          percentage: number;
          direction: 'up' | 'down' | 'stable';
        }> = {};
        
        result.products.forEach(product => {
          const random = Math.random();
          if (random > 0.7) {
            // Price going up
            mockPriceTrends[product.id] = {
              percentage: Math.round(Math.random() * 15),
              direction: 'up'
            };
          } else if (random > 0.3) {
            // Price going down
            mockPriceTrends[product.id] = {
              percentage: Math.round(Math.random() * 20),
              direction: 'down'
            };
          } else {
            // Price stable
            mockPriceTrends[product.id] = {
              percentage: 0,
              direction: 'stable'
            };
          }
        });
        setPriceTrends(mockPriceTrends);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Find the Best Prices Across All Retailers
              </h1>
              <p className="text-blue-100 mb-8 text-lg">
                Compare prices, predict drops, and get personalized recommendations to save money on your next purchase.
              </p>
              <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
                <a href="#products" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium inline-block text-center">
                  Browse Products
                </a>
                <a href="#featured-deals" className="border border-white text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium inline-block text-center">
                  Featured Deals
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center p-12">
              <img 
                src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Shopping comparison" 
                className="max-h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Price Comparison</h3>
              <p className="text-gray-600">
                Compare prices across multiple retailers to find the best deals instantly.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Price Predictions</h3>
              <p className="text-gray-600">
                AI-powered predictions help you know when prices will drop so you can save more.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Smart Deal Scoring</h3>
              <p className="text-gray-600">
                Our algorithm rates deals based on price, shipping, and seller reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <a href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
            View All →
          </a>
        </div>
        <ProductGrid 
          products={featuredProducts} 
          isLoading={isLoading} 
          showPriceTrends={true} 
          priceTrends={priceTrends}
        />
      </section>

      {/* Best Deals Section */}
      <section id="featured-deals" className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Best Deals Today</h2>
          <a href="/deals" className="text-blue-600 hover:text-blue-800 font-medium">
            View All →
          </a>
        </div>
        <ProductGrid 
          products={bestDeals} 
          isLoading={isLoading} 
          dealScores={dealScores}
        />
      </section>

      {/* Trending Products */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Trending Now</h2>
          <a href="/trending" className="text-blue-600 hover:text-blue-800 font-medium">
            View All →
          </a>
        </div>
        <ProductGrid 
          products={trendingProducts} 
          isLoading={isLoading}
        />
      </section>

      {/* Call to Action */}
      <section className="mb-12">
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Never Miss a Price Drop Again
              </h2>
              <p className="text-gray-700 mb-8">
                Sign up for price drop alerts on your favorite products and get notified when prices fall.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-l-md border-transparent focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  type="button" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-r-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center p-12">
              <img 
                src="https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Price alerts" 
                className="max-h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <a href="/category/smartphones" className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="h-40 bg-blue-100 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-blue-600" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-900">Smartphones</h3>
                <p className="text-sm text-gray-600 mt-1">Compare latest models</p>
              </div>
            </div>
          </a>
          <a href="/category/laptops" className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="h-40 bg-green-100 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-green-600" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-900">Laptops</h3>
                <p className="text-sm text-gray-600 mt-1">Find best computing deals</p>
              </div>
            </div>
          </a>
          <a href="/category/audio" className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="h-40 bg-purple-100 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-purple-600" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-900">Audio</h3>
                <p className="text-sm text-gray-600 mt-1">Headphones & speakers</p>
              </div>
            </div>
          </a>
          <a href="/category/tvs" className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="h-40 bg-red-100 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-red-600" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-900">Televisions</h3>
                <p className="text-sm text-gray-600 mt-1">Smart TVs & displays</p>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;