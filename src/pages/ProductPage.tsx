import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import ProductDetails from '../components/product/ProductDetails';
import PriceComparisonTable from '../components/product/PriceComparisonTable';
import PriceTrendChart from '../components/product/PriceTrendChart';
import ProductGrid from '../components/product/ProductGrid';
import { Loader } from 'lucide-react';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    currentProduct,
    retailerOffers,
    priceHistory,
    pricePrediction,
    relatedProducts,
    isLoading,
    error,
    fetchProductDetails,
    getBestDeal
  } = useProduct();

  useEffect(() => {
    if (id) {
      fetchProductDetails(id).catch(() => {
        navigate('/');
      });
    }
  }, [id, fetchProductDetails, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center p-4">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p>{error || "Product not found"}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const bestDeal = getBestDeal();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details */}
      <section className="mb-8">
        <ProductDetails product={currentProduct} />
      </section>

      {/* Price Comparison Table */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Price Comparison</h2>
        </div>
        <PriceComparisonTable 
          offers={retailerOffers} 
          bestDealId={bestDeal?.id}
        />
      </section>

      {/* Price History & Prediction Chart */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Price History & Prediction</h2>
        </div>
        <PriceTrendChart 
          priceHistory={priceHistory} 
          pricePrediction={pricePrediction} 
          productName={currentProduct.name}
        />
      </section>

      {/* Product Specifications */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Specifications</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {Object.entries(currentProduct.specifications).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium">{key}:</span>
                <span className="text-gray-900 ml-2">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Similar Products</h2>
          <a 
            href={`/category/${currentProduct.category}`} 
            className="text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base"
          >
            View All →
          </a>
        </div>
        <ProductGrid 
          products={relatedProducts}
          title="Similar Products"
        />
      </section>
    </div>
  );
};

export default ProductPage;