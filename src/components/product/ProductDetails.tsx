import React from 'react';
import { Star, Truck, Clock, CheckCircle, Info, Share2, Heart } from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Product Image */}
        <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-[400px] object-contain"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Brand: <span className="font-medium">{product.brand}</span> | 
              Category: <span className="font-medium">{product.category}</span>
            </p>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Price Range */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-baseline">
              <div>
                <p className="text-sm text-gray-600 mb-1">Price starts from</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatPrice(product.lowestPrice)}
                </p>
              </div>
              {product.highestPrice > product.lowestPrice && (
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Up to</p>
                  <p className="text-xl text-gray-700">
                    {formatPrice(product.highestPrice)}
                  </p>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Price comparison from multiple retailers
            </p>
          </div>
          
          {/* Delivery Info */}
          <div className="mb-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-700">Free Delivery Available</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm text-gray-700">Fast Delivery</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
              Compare Prices
            </button>
            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Share2 className="h-5 w-5 text-gray-700" />
            </button>
          </div>
          
          {/* Key Specifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Specifications</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {Object.entries(product.specifications).slice(0, 6).map(([key, value]) => (
                <li key={key} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    <span className="font-medium">{key}:</span> {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;