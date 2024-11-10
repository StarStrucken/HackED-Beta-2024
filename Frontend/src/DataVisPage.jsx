import "./DataVisPage.css";
import LineChartVis from "./LineChartVis";
import NavBar from "./NavBar";

export default function DataVisPage() {
  return (
    <div className="visualize-page">
      <NavBar />
      <LineChartVis />
      <div className="container2">
        <div className="sbox">
          <p> Stock Volume affecting price change:</p>
          Stock volume affects prices by reflecting the level of interest and
          demand for a stock. High trading volume often signals strong interest,
          which can drive price movement in the direction of the demand—upward
          if buyers dominate or downward if sellers do. For example, if there’s
          a surge in buying volume, it can push the stock price higher as demand
          outpaces supply. Conversely, heavy selling volume can drive prices
          down. Low volume, however, may indicate weak interest, making it
          easier for individual trades to impact the price, leading to greater
          volatility or less reliable price trends. High volume, especially
          during price changes, tends to confirm the strength of the movement,
          while low volume may suggest uncertainty or weak momentum.
        </div>
        <div className="sbox">
          <p> Other factors affecting price change:</p>
          In addition to supply and demand, stock prices are influenced by
          factors like investor psychology, economic indicators, government
          policies, and trading practices. Investor emotions, such as fear or
          greed, can drive irrational buying or selling, leading to price
          changes not directly tied to a stock’s value. Macroeconomic
          indicators, like inflation, GDP growth, and employment rates, impact
          market sentiment and can shift stock prices based on economic
          outlooks. Government policies, including tax changes, regulations, and
          interest rate decisions, affect specific industries or the entire
          market, influencing stock prices. Additionally, trading practices like
          high-frequency trading and speculative trading can create short-term
          price fluctuations without a real change in the stock’s underlying
          value.
        </div>
      </div>
    </div>
  );
}
