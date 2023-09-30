import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.llama.fi/summary/fees/lyra?dataType=dailyFees');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setChartData(data.totalDataChart);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const labels = chartData.map(data => new Date(data[0] * 1000).toLocaleDateString());
      const values = chartData.map(data => data[1]);

      const ctx = document.getElementById('chart').getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Daily Fees',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: [{
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MMM D'
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              }
            }],
            y: [{
              scaleLabel: {
                display: true,
                labelString: 'Fees'
              }
            }]
          },
          tooltips: {
            mode: 'index',
            intersect: false
          }
        }
      });

      // Store the chart instance in the ref
      chartRef.current = newChart;
    }
  }, [chartData]);

  return (
    <div>
      <canvas id="chart" width="400" height="200"></canvas>
    </div>
  );
};

export default ChartComponent;
