import React from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  dealScore?: number;
  showPriceTrend?: boolean;
  priceTrend?: {
    percentage: number;
    direction: 'up' | 'down' | 'stable';
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  dealScore,
  showPriceTrend = false,
  priceTrend
}) => {
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Determine deal score badge class
  const getDealScoreBadgeClass = () => {
    if (!dealScore) return '';
    
    if (dealScore >= 9) return 'deal-score-badge deal-score-excellent';
    if (dealScore >= 8) return 'deal-score-badge deal-score-good';
    if (dealScore >= 7) return 'deal-score-badge deal-score-average';
    return 'deal-score-badge deal-score-poor';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg relative h-full">
      {/* Deal Score Badge */}
      {dealScore && (
        <div className={getDealScoreBadgeClass()}>
          {dealScore.toFixed(1)}
        </div>
      )}
      
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Price trend indicator */}
        {showPriceTrend && priceTrend && (
          <div className={`absolute bottom-2 right-2 rounded-full px-2 py-1 text-xs font-medium text-white flex items-center ${
            priceTrend.direction === 'down' ? 'bg-green-500' : 
            priceTrend.direction === 'up' ? 'bg-red-500' : 'bg-gray-500'
          }`}>
            {priceTrend.direction === 'down' ? (
              <TrendingDown className="h-3 w-3 mr-1" />
            ) : priceTrend.direction === 'up' ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : null}
            {priceTrend.percentage}%
          </div>
        )}
      </Link>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</div>
        <Link to={`/product/${product.id}`} className="font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2">
          {product.name}
        </Link>
        <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
        
        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">
            ({product.reviewCount})
          </span>
        </div>
        
        {/* Prices */}
        <div className="mt-auto">
          <div className="flex items-baseline justify-between">
            <div className="text-lg font-bold text-gray-900">
              {formatPrice(product.lowestPrice)}
            </div>
            {product.highestPrice > product.lowestPrice && (
              <div className="text-sm text-gray-500">
                Up to {formatPrice(product.highestPrice)}
              </div>
            )}
          </div>
          <div className="mt-2">
            <Link 
              to={`/product/${product.id}`}
              className="w-full bg-blue-600 text-white text-center py-2 rounded-md font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              Compare Prices
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;