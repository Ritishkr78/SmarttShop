import React, { useState, useEffect } from 'react';
import { Users, DollarSign, ShoppingCart, ArrowUpRight, Activity } from 'lucide-react';
import InsightCard from '../components/admin/InsightCard';
import ProductInsightsTable from '../components/admin/ProductInsightsTable';
import DemandTrendChart from '../components/admin/DemandTrendChart';
import { getProductInsights, getDemandTrends } from '../services/apiService';
import type { ProductInsight, DemandTrend } from '../types';

const AdminDashboard: React.FC = () => {
  const [productInsights, setProductInsights] = useState<ProductInsight[]>([]);
  const [demandTrends, setDemandTrends] = useState<DemandTrend[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetch product insights
      setIsLoadingInsights(true);
      try {
        const insights = await getProductInsights();
        setProductInsights(insights);
      } catch (error) {
        console.error('Error fetching product insights:', error);
      } finally {
        setIsLoadingInsights(false);
      }

      // Fetch demand trends
      setIsLoadingTrends(true);
      try {
        const trends = await getDemandTrends();
        setDemandTrends(trends);
      } catch (error) {
        console.error('Error fetching demand trends:', error);
      } finally {
        setIsLoadingTrends(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Export Reports
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InsightCard
            title="Total Visitors"
            value="24,892"
            previousValue="22,678"
            percentageChange={9.8}
            icon={<Users className="h-6 w-6" />}
            trendDirection="up"
            isGoodTrend={true}
          />
          <InsightCard
            title="Revenue Generated"
            value="₹1,248,560"
            previousValue="₹1,142,230"
            percentageChange={9.3}
            icon={<DollarSign className="h-6 w-6" />}
            trendDirection="up"
            isGoodTrend={true}
          />
          <InsightCard
            title="Conversion Rate"
            value="3.8%"
            previousValue="3.2%"
            percentageChange={18.7}
            icon={<ArrowUpRight className="h-6 w-6" />}
            trendDirection="up"
            isGoodTrend={true}
          />
          <InsightCard
            title="Product Searches"
            value="87,432"
            previousValue="72,109"
            percentageChange={21.2}
            icon={<Activity className="h-6 w-6" />}
            trendDirection="up"
            isGoodTrend={true}
          />
        </div>
      </section>

      {/* Demand Trend Chart */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Search Volume Trends</h2>
          <p className="text-gray-600">Category-wise search volume over the past 30 days</p>
        </div>
        <DemandTrendChart trends={demandTrends} isLoading={isLoadingTrends} />
      </section>

      {/* Product Insights Table */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Product Performance</h2>
          <p className="text-gray-600">Engagement metrics and price change statistics</p>
        </div>
        <ProductInsightsTable insights={productInsights} isLoading={isLoadingInsights} />
      </section>

      {/* Recent Activity */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          <p className="text-gray-600">Latest updates and user actions</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-4 ${
                    item % 3 === 0 ? 'bg-blue-100 text-blue-600' : 
                    item % 3 === 1 ? 'bg-green-100 text-green-600' : 
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {item % 3 === 0 ? (
                      <Users className="h-5 w-5" />
                    ) : item % 3 === 1 ? (
                      <ShoppingCart className="h-5 w-5" />
                    ) : (
                      <DollarSign className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">
                      {item % 3 === 0 ? 'New user registration' : 
                       item % 3 === 1 ? 'Product price changed' : 
                       'Affiliate conversion'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {item % 3 === 0 ? 'A new user registered from Mumbai, India' : 
                       item % 3 === 1 ? 'iPhone 15 Pro price dropped by 5% on Amazon' : 
                       'User converted on Sony WH-1000XM5 via Flipkart'}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {`${item * 10} minutes ago`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-600 font-medium hover:text-blue-800">
              View All Activity
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;