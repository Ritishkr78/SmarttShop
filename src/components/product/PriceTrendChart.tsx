import React, { useEffect, useRef } from 'react';
import { PriceHistory, PricePrediction } from '../../types';
import Chart from 'chart.js/auto';

interface PriceTrendChartProps {
  priceHistory: PriceHistory[];
  pricePrediction: PricePrediction | null;
  productName: string;
}

const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ 
  priceHistory, 
  pricePrediction, 
  productName 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"line"> | null>(null);

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  useEffect(() => {
    if (!chartRef.current || priceHistory.length === 0) return;
    
    // Group price history by date and find minimum price for each date
    const groupedHistory = priceHistory.reduce<Record<string, number>>((acc, item) => {
      if (!acc[item.date] || item.price < acc[item.date]) {
        acc[item.date] = item.price;
      }
      return acc;
    }, {});
    
    const historyDates = Object.keys(groupedHistory).sort();
    const historyPrices = historyDates.map(date => groupedHistory[date]);
    
    // Prepare prediction data if available
    const predictionDates = pricePrediction?.dates || [];
    const predictionPrices = pricePrediction?.prices || [];
    const upperBound = pricePrediction?.confidence.upper || [];
    const lowerBound = pricePrediction?.confidence.lower || [];
    
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...historyDates.map(formatDate), ...predictionDates.map(formatDate)],
        datasets: [
          // Historical price line
          {
            label: 'Historical Price',
            data: [...historyPrices, ...Array(predictionDates.length).fill(null)],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1,
            pointBackgroundColor: '#3b82f6',
            pointRadius: 2,
            pointHoverRadius: 4
          },
          // Predicted price line
          {
            label: 'Price Prediction',
            data: [...Array(historyDates.length).fill(null), ...predictionPrices],
            borderColor: '#3b82f6',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            tension: 0.1,
            pointBackgroundColor: '#3b82f6',
            pointRadius: 2,
            pointHoverRadius: 4
          },
          // Upper confidence bound
          {
            label: 'Upper Bound',
            data: [...Array(historyDates.length).fill(null), ...upperBound],
            borderColor: 'rgba(59, 130, 246, 0.3)',
            backgroundColor: 'transparent',
            borderWidth: 1,
            fill: '+1',
            tension: 0.1,
            pointRadius: 0
          },
          // Lower confidence bound
          {
            label: 'Lower Bound',
            data: [...Array(historyDates.length).fill(null), ...lowerBound],
            borderColor: 'rgba(59, 130, 246, 0.3)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 1,
            fill: false,
            tension: 0.1,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                if (context.parsed.y !== null) {
                  return `${label}: ${formatPrice(context.parsed.y)}`;
                }
                return label;
              }
            }
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              filter: function(item) {
                // Only show "Historical Price" and "Price Prediction" in legend
                return item.text === 'Historical Price' || item.text === 'Price Prediction';
              }
            }
          },
          title: {
            display: true,
            text: `Price Trend for ${productName}`,
            font: {
              size: 16
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return formatPrice(value as number);
              }
            }
          }
        }
      }
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [priceHistory, pricePrediction, productName]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="chart-container h-80">
        <canvas ref={chartRef} />
      </div>
      
      {pricePrediction && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Price Prediction Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-600">Lowest Predicted Price</p>
              <p className="text-xl font-bold text-blue-600">
                {formatPrice(pricePrediction.lowestPredictedPrice)}
              </p>
              <p className="text-xs text-gray-500">
                Expected on {formatDate(pricePrediction.lowestPredictedDate)}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-600">Price Drop Prediction</p>
              <p className={`text-xl font-bold ${pricePrediction.priceDropPercentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {pricePrediction.priceDropPercentage.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">
                Expected in the next 30 days
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-600">Buying Recommendation</p>
              <p className="text-lg font-semibold text-gray-800">
                {pricePrediction.priceDropPercentage > 5 
                  ? 'Wait for better price' 
                  : pricePrediction.priceDropPercentage > 0
                    ? 'Consider waiting'
                    : 'Good time to buy'}
              </p>
              <p className="text-xs text-gray-500">
                Based on historical data and predictions
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceTrendChart;