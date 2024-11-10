import "./Forecast.css";
import NavBar from "./NavBar";
import LineChart from "./Line";

export default function Forecast() {
  return (
    <div className="forecast-page">
      <NavBar />
      <LineChart />
      <div className="container-3">
        <div className="box-3">
          <p>Understanding Adj Close Price:</p>A trend in adjusted closing
          prices represents the general direction in which a stock’s price is
          moving over a specific period. An upward slope on the graph indicates
          that the stock's adjusted closing prices are increasing, suggesting a
          period of growth or bullish sentiment in the market. Conversely, a
          downward slope signifies a decline in prices, which can be interpreted
          as a bearish trend, where the market is losing confidence in the
          stock. A flat or horizontal trend indicates stability, where the
          stock's price is neither significantly increasing nor decreasing,
          often reflecting a neutral market sentiment. Analyzing these trends
          helps investors understand the overall performance and momentum of a
          stock.
        </div>
      </div>
    </div>
  );
}
