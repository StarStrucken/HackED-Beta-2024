import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./LineChartVis.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [ticker, setTicker] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Adj Close ($)",
        data: [],
        borderColor: "rgba(255, 192, 192, 1)",
        backgroundColor: "rgba(255, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(255, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 0, 192, 1)",
        borderWidth: 2,
        tension: 0.3,
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
        color: "white",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "#444" },
        title: { display: true, text: "Trading Day", color: "white" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "white" },
        grid: { color: "#444" },
        title: { display: true, text: "Adj Close ($)", color: "white" },
      },
    },
  };

  const fetchForecastData = async (selectedTicker) => {
    console.log(selectedTicker);
    try {
      const response = await fetch(
        `http://localhost:5001/predict?ticker=${selectedTicker}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const jsonData = await response.json();
      if (jsonData.forecast) {
        const forecastData = jsonData.forecast; // Assuming the forecast data is under the 'forecast' key

        // Extract dates and adjusted close prices from the forecast data
        const tradingDay = Object.keys(forecastData); // Get the dates (keys)
        const adjClose = Object.values(forecastData); // Get the adjusted close prices (values)

        setChartData({
          labels: tradingDay, // Set the labels (dates) for the x-axis
          datasets: [
            {
              label: "Adj Close ($)",
              data: adjClose, // Set the adjusted close prices for the y-axis
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const handleTickerChange = async (selectedTicker) => {
    if (isCooldown) return;
    setTicker(selectedTicker);
    await fetchForecastData(selectedTicker);

    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), 1000);
  };

  const MAANGTickers = ["META", "AAPL", "AMZN", "NFLX", "GOOGL"];

  return (
    <div className="chart-container">
      <h2>Select a MAANG Ticker</h2>
      <div className="button-container">
        {MAANGTickers.map((maangTicker) => (
          <button
            key={maangTicker}
            onClick={() => handleTickerChange(maangTicker)}
            disabled={isCooldown}
            className={`ticker-button ${isCooldown ? "disabled" : ""}`}
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

export default LineChart;
