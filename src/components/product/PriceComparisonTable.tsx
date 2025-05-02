import React from 'react';
import { ExternalLink, CheckCircle, AlertCircle, Truck, Clock } from 'lucide-react';
import { RetailerOffer } from '../../types';

interface PriceComparisonTableProps {
  offers: RetailerOffer[];
  bestDealId?: string;
}

const PriceComparisonTable: React.FC<PriceComparisonTableProps> = ({ 
  offers, 
  bestDealId 
}) => {
  // Sort offers by price (lowest first)
  const sortedOffers = [...offers].sort((a, b) => a.price - b.price);

  // Function to format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Function to render deal score badge
  const renderDealScoreBadge = (score: number) => {
    let badgeClass = '';
    let label = '';
    
    if (score >= 9) {
      badgeClass = 'bg-green-500';
      label = 'Excellent';
    } else if (score >= 8) {
      badgeClass = 'bg-blue-500';
      label = 'Great';
    } else if (score >= 7) {
      badgeClass = 'bg-yellow-500';
      label = 'Good';
    } else {
      badgeClass = 'bg-gray-500';
      label = 'Fair';
    }
    
    return (
      <span className={`text-xs font-medium px-2 py-1 rounded-full text-white ${badgeClass}`}>
        {label} ({score})
      </span>
    );
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Retailer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delivery
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deal Score
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedOffers.map((offer) => (
            <tr 
              key={offer.id} 
              className={`hover:bg-blue-50 transition-colors ${offer.id === bestDealId ? 'bg-blue-50' : ''}`}
            >
              {/* Retailer */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img 
                    src={offer.retailerLogo} 
                    alt={offer.retailerName} 
                    className="h-8 w-auto mr-2"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {offer.retailerName}
                  </span>
                  {offer.id === bestDealId && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Best Deal
                    </span>
                  )}
                </div>
              </td>
              
              {/* Price */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-900">
                    {formatPrice(offer.price)}
                  </span>
                  {offer.originalPrice && offer.originalPrice > offer.price && (
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(offer.originalPrice)}
                      </span>
                      <span className="text-xs font-medium text-green-600">
                        Save {offer.discount}%
                      </span>
                    </div>
                  )}
                </div>
              </td>
              
              {/* Delivery */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-900">{offer.deliveryTime}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Truck className="h-4 w-4 text-gray-500 mr-1" />
                    {offer.freeShipping ? (
                      <span className="text-xs text-green-600">Free Shipping</span>
                    ) : (
                      <span className="text-xs text-gray-500">
                        +{formatPrice(offer.deliveryFee)}
                      </span>
                    )}
                  </div>
                </div>
              </td>
              
              {/* Deal Score */}
              <td className="px-6 py-4 whitespace-nowrap">
                {renderDealScoreBadge(offer.dealScore)}
              </td>
              
              {/* Rating */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className={`h-4 w-4 ${star <= Math.round(offer.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-600">
                    {offer.rating.toFixed(1)}
                  </span>
                </div>
              </td>
              
              {/* Action */}
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <a
                  href={offer.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Buy Now
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceComparisonTable;