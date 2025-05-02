import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DemandTrend } from '../../types';

interface DemandTrendChartProps {
  trends: DemandTrend[];
  isLoading?: boolean;
}

const DemandTrendChart: React.FC<DemandTrendChartProps> = ({
  trends,
  isLoading = false
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'line'> | null>(null);

  useEffect(() => {
    if (!chartRef.current || isLoading || trends.length === 0) return;

    // Group trends by category
    const trendsByCategory = trends.reduce<Record<string, Record<string, number>>>((acc, trend) => {
      if (!acc[trend.category]) {
        acc[trend.category] = {};
      }
      acc[trend.category][trend.date] = trend.searchVolume;
      return acc;
    }, {});

    // Get unique dates and sort them
    const dates = Array.from(new Set(trends.map(t => t.date))).sort();
    
    // Get categories
    const categories = Object.keys(trendsByCategory);

    // Prepare datasets
    const datasets = categories.map((category, index) => {
      const colorIndex = index % 5; // Cycle through 5 colors
      const colors = [
        { line: 'rgb(59, 130, 246)', fill: 'rgba(59, 130, 246, 0.1)' }, // blue
        { line: 'rgb(239, 68, 68)', fill: 'rgba(239, 68, 68, 0.1)' },   // red
        { line: 'rgb(16, 185, 129)', fill: 'rgba(16, 185, 129, 0.1)' }, // green
        { line: 'rgb(245, 158, 11)', fill: 'rgba(245, 158, 11, 0.1)' }, // amber
        { line: 'rgb(139, 92, 246)', fill: 'rgba(139, 92, 246, 0.1)' }  // purple
      ];
      
      return {
        label: category,
        data: dates.map(date => trendsByCategory[category][date] || 0),
        borderColor: colors[colorIndex].line,
        backgroundColor: colors[colorIndex].fill,
        tension: 0.3,
        fill: true
      };
    });

    // Format dates for display
    const formattedDates = dates.map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create chart
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: formattedDates,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false
          },
          title: {
            display: true,
            text: 'Search Volume Trends by Category',
            font: {
              size: 16
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: (value) => {
                return value.toLocaleString();
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [trends, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default DemandTrendChart;