import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface InsightCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  percentageChange?: number;
  icon: React.ReactNode;
  trendDirection?: 'up' | 'down' | 'neutral';
  isGoodTrend?: boolean;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  previousValue,
  percentageChange,
  icon,
  trendDirection = 'neutral',
  isGoodTrend = true
}) => {
  const getTrendColor = () => {
    if (trendDirection === 'neutral') return 'text-gray-500';
    
    if (isGoodTrend) {
      return trendDirection === 'up' ? 'text-green-500' : 'text-red-500';
    } else {
      return trendDirection === 'up' ? 'text-red-500' : 'text-green-500';
    }
  };

  const getTrendIcon = () => {
    if (trendDirection === 'up') {
      return <TrendingUp className={`h-4 w-4 ${getTrendColor()}`} />;
    } 
    if (trendDirection === 'down') {
      return <TrendingDown className={`h-4 w-4 ${getTrendColor()}`} />;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {previousValue && (
            <p className="text-sm text-gray-500 mt-1">
              Previous: {previousValue}
            </p>
          )}
        </div>
        {percentageChange !== undefined && (
          <div className={`flex items-center ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="ml-1 font-medium">
              {Math.abs(percentageChange).toFixed(1)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightCard;