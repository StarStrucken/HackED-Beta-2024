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
  const [ticker, setTicker] = useState("META");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Adj Close ($)",
        data: [],
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  });
  const [isCooldown, setIsCooldown] = useState(false);
  const [loading, setLoading] = useState(true);

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
    console.log(`Fetching data for ticker: ${selectedTicker}`); // Debugging line
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/predict?ticker=${selectedTicker}`
      );
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const jsonData = await response.json();
      console.log("Received data:", jsonData);

      if (jsonData) {
        const adjClose = Object.values(jsonData);

        setChartData({
          labels: [1, 2, 3, 4, 5, 6, 7],
          datasets: [
            {
              label: "Adj Close ($)",
              data: adjClose,
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

  useEffect(() => {
    // Fetch data for "META" on initial load
    console.log("Component mounted, fetching initial data for META");
    fetchForecastData("META");
  }, []); 

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
            className={`ticker-button ${ticker === maangTicker ? "active" : ""} ${isCooldown || loading ? "disabled" : ""}`}
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
