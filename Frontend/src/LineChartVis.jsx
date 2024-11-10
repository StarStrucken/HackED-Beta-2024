// Line Chart for Visualization Page component

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
  const [ticker, setTicker] = useState("META"); // Displayed ticker
  const [currentTicker, setCurrentTicker] = useState("META"); // Current ticker (META by default)
  const [inputTicker, setInputTicker] = useState(""); 
  const [column, setColumn] = useState("Adj Close");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: `${column} ($)`,
        data: [],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        borderWidth: 2,
        tension: 0.4,
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
      legend: { display: false },
      title: {
        display: true,
        text: `Forecast for ${ticker.toUpperCase()} - ${column}`,
        color: "white",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "#444" },
        title: { display: true, text: "Trading Day (for a year)", color: "white" },
      },
      y: {
        beginAtZero: false,
        ticks: { color: "white" },
        grid: { color: "#444" },
        title: { display: true, text: `${column} ($)`, color: "white" },
      },
    },
  };

  const fetchForecastData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/data?ticker=${currentTicker.toUpperCase()}&column=${column}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || `HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      const dataValues = jsonData.data?.[column];

      if (!dataValues || dataValues.length === 0) {
        throw new Error("No data found for the specified column.");
      }

      console.log("Received data:", jsonData);

      setChartData({
        labels: Array.from({ length: dataValues.length }, (_, i) => i + 1),
        datasets: [
          {
            label: `${column} ($)`,
            data: dataValues,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      });
      setTicker(currentTicker); 
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      alert("Error fetching forecast data. Please check the ticker and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecastData();
  }, [ticker, column]);

  const handleTickerSubmit = async () => {
    if (isCooldown || loading) return;
    setCurrentTicker(inputTicker || ticker); 
    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), 1000);
  };

  const handleColumnChange = async (selectedColumn) => {
    if (isCooldown || loading) return;
    setColumn(selectedColumn);
    await fetchForecastData();
    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), 1000);
  };

  return (
    <div className="chart-container">
      <h2 style={{ marginTop: "70px", color: "white" }}>Enter Stock Ticker</h2>
      <input
        type="text"
        value={inputTicker}
        onChange={(e) => setInputTicker(e.target.value)}
        placeholder="Enter ticker, e.g., AAPL"
        className="ticker-input"
      />
      <button
        style={{ marginLeft: "20px" }}
        className="submit-button"
        onClick={handleTickerSubmit}
        disabled={isCooldown || loading}
      >
        Submit
      </button>

      <div className="button-container" style={{ marginTop: "20px" }}>
        {["Open", "High", "Low", "Close", "Adj Close", "Volume"].map((col) => (
          <button
            key={col}
            onClick={() => handleColumnChange(col)}
            disabled={isCooldown || loading}
            className={`ticker-button ${column === col ? "active" : ""} ${
              isCooldown || loading ? "disabled" : ""
            }`}
          >
            {col}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-indicator"></div>
      ) : (
        <div className="line-chart">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default LineChart;
