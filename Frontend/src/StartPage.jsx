import React from "react";
import "./StartPage.css"
import "./DataVisPage"
import NavBar from "./NavBar";
import TechStack from "./TechStack";
import Team from "./Team";

export default function StartPage() {
    return (
        <div className="page" id="top">
            <NavBar />
            <div className="start-page">
                <h1 className="project-title"> MAANG Forecasting Tool</h1>
            <p className="description">This tool predicts stock prices using advanced algorithms and historical data for FAANG (Facebook, Apple, Amazon, Netflix, Google).</p>
            <h2 className="description-header">MAANG</h2>
            <p className="description">Predicting stock prices for MAANG companies (Meta, Amazon, Apple, Netflix, and Google) is particularly valuable due to their significant influence on the global economy and stock markets. 
                These tech giants are leaders in innovation, making them key drivers of market trends and investor sentiment. Accurate predictions of their stock performance can provide critical insights for individual investors, hedge funds, and financial institutions aiming to optimize their portfolios, minimize risks, and maximize returns. 
                Additionally, since MAANG stocks are highly volatile and sensitive to market conditions, regulatory changes, and technological advancements, having a reliable forecast can help investors make informed decisions, anticipate market shifts, and capitalize on potential opportunities in the tech sector. 
            </p>
            <h2 className="description-header">Stock Information</h2>
                <div className="container">
                    <div className="box"><p>Open:</p> The stock's price at the beginning of the trading session.</div>
                    <div className="box"><p>High:</p> The highest price the stock reached during that trading day.</div>
                    <div className="box"><p>Low:</p> The lowest price the stock dropped to within that trading session.</div>
                </div>
                <div className="container">
                <div className="box"><p>Close:</p> The final price of the stock when the trading session ended.</div>
                    <div className="box"><p>Adj Close:</p> The adjusted closing price, taking into account events like dividends, stock splits, and new share issuances to provide a more accurate reflection of a stock's value over time.</div>
                    <div className="box"><p>Volume:</p> The total number of shares traded during that day, representing trading activity and liquidity for the stock.</div>
                </div>
                <div className="container">
                    
                    <div className="box-2">
                        <h1>Correlation</h1>
                        These columns collectively offer insights into a stock's trading behavior and performance throughout the day. For instance, the Open and Close prices reveal price movement from the beginning to the end of the session, while the High and Low indicate the range within which the stock fluctuated. Adj Close provides a long-term view by normalizing Close prices to account for external factors, helping investors analyze trends. Volume measures market interest and trading intensity, often impacting price changes—higher volumes may indicate stronger buying or selling interest, potentially leading to larger price shifts within the Open-Close range. Together, these metrics provide a holistic view of the stock’s performance, volatility, and investor sentiment on any given day.
                        </div>
                </div>
            <TechStack />
            <Team />
            </div>
            


        </div>
    )
}