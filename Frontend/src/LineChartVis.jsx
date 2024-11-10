import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './LineChartVis.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartVis = () => {
  const [ticker, setTicker] = useState('');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  });
  const [isCooldown, setIsCooldown] = useState(false);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Monthly Forecast for ${ticker}`,
        color: 'white',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: '#444' },
        title: { display: true, text: 'Months', color: 'white' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: 'white' },
        grid: { color: '#444' },
        title: { display: true, text: 'Revenue ($)', color: 'white' },
      },
    },
  };

  const fetchForecastData = async (selectedTicker) => {
    try {
      const response = await fetch(`http://localhost:5001/forecast?ticker=${selectedTicker}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const jsonData = await response.json();
      if (jsonData.forecast) {
        const { months, revenues } = jsonData.forecast;
        setChartData({
          labels: months,
          datasets: [
            {
              label: 'Revenue ($)',
              data: revenues,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const handleTickerChange = async (selectedTicker) => {
    if (isCooldown) return;
    setTicker(selectedTicker);
    await fetchForecastData(selectedTicker);

    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), 1000);
  };

  const stockColumns = ['Open', 'High', 'Low', 'Close'];

  return (
    <div className="chart-container">
      <h2 style={{ color: 'white' }}>Select a Stock Column</h2>
      <div className="button-container">
        {stockColumns.map((maangTicker) => (
          <button
            key={maangTicker}
            onClick={() => handleTickerChange(maangTicker)}
            disabled={isCooldown}
            className={`ticker-button ${isCooldown ? 'disabled' : ''}`}
          >
            {maangTicker}
          </button>
        ))}
      </div>
      <div className="line-chart">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChartVis;
