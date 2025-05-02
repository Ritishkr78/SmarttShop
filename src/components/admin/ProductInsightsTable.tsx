import React from 'react';
import { ArrowUpDown, ExternalLink } from 'lucide-react';
import { ProductInsight } from '../../types';

interface ProductInsightsTableProps {
  insights: ProductInsight[];
  isLoading?: boolean;
}

const ProductInsightsTable: React.FC<ProductInsightsTableProps> = ({
  insights,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-6 flex justify-center">
        <div className="animate-pulse w-full">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded w-full mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  // Function to format numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  // Function to format percentage
  const formatPercentage = (num: number) => {
    return `${(num * 100).toFixed(1)}%`;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Performance Insights</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Product</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Views</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Clicks</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Conversion Rate</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Price Changes</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {insights.map((insight) => (
              <tr key={insight.productId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{insight.productName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatNumber(insight.viewCount)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatNumber(insight.clickCount)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${
                    insight.conversionRate > 0.1 ? 'text-green-600' : 
                    insight.conversionRate > 0.05 ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {formatPercentage(insight.conversionRate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{insight.priceChanges}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a
                    href={`/product/${insight.productId}`}
                    className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                  >
                    Details
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductInsightsTable;