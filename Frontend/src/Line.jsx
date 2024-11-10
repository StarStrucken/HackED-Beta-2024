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
        borderColor: "red",
        backgroundColor: "red",
        pointBackgroundColor: "red",
        pointBorderColor: "red",
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "red",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  });
  const [isCooldown, setIsCooldown] = useState(false);
  const [loading, setLoading] = useState(false);

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
        beginAtZero: false,
        ticks: { color: "white" },
        grid: { color: "#444" },
        title: { display: true, text: "Adj Close ($)", color: "white" },
      },
    },
  };

  const fetchForecastData = async (selectedTicker) => {
    console.log("Fetching data for ticker:", selectedTicker);
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/predict?ticker=${selectedTicker}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      console.log("Received data:", jsonData);  // Debugging: Log the raw response

      // Check if 'forecast' exists and is an object
      if (jsonData) {
        const tradingDay = Object.keys(jsonData); // Extract dates (keys)
        const adjClose = Object.values(jsonData); // Extract adjusted close prices (values)

        console.log("Dates:", tradingDay); // Debugging: Log dates
        console.log("Adjusted Close:", adjClose); // Debugging: Log prices

        // Update chart data with received data
        setChartData({
          labels: [1, 2, 3, 4, 5, 6, 7], // Set the labels (dates) for the x-axis
          datasets: [
            {
              label: "Adj Close ($)",
              data: adjClose, // Set the adjusted close prices for the y-axis
              borderColor: "blue",
              backgroundColor: "blue",
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            },
          ],
        });
      } else {
        console.error("Invalid forecast data structure");
      }
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTickerChange = async (selectedTicker) => {
    if (isCooldown || loading) return;
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
            disabled={isCooldown || loading}
            className={`ticker-button ${isCooldown || loading ? "disabled" : ""}`}
          >
            {maangTicker}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <div className="line-chart">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default LineChart;
