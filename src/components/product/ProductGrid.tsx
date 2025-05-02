import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';
import { Loader } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  dealScores?: Record<string, number>;
  priceTrends?: Record<string, {
    percentage: number;
    direction: 'up' | 'down' | 'stable';
  }>;
  showPriceTrends?: boolean;
  title?: string;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  dealScores = {},
  priceTrends = {},
  showPriceTrends = false,
  title,
  emptyMessage = 'No products found'
}) => {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="flex flex-col items-center">
          <Loader className="h-10 w-10 text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-16 bg-white rounded-lg shadow">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            dealScore={dealScores[product.id]}
            showPriceTrend={showPriceTrends}
            priceTrend={priceTrends[product.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;