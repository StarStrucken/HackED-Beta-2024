import React from "react";
import "./StartPage.css"
import "./DataVisPage"
import NavBar from "./NavBar";
import TechStack from "./TechStack";

export default function StartPage() {
    return (
        <div className="page">
            <NavBar />
            <div>
                <h1 className="project-title"> Stock Forecasting Tool</h1>
            <p>This tool predicts stock prices using advanced algorithms and historical data for FAANG (Facebook, Apple, Amazon, Netflix, Google).</p>
            <h2>FAANG</h2>
            <p>Predicting stock prices for FAANG companies (Facebook, Amazon, Apple, Netflix, and Google) is particularly valuable due to their significant influence on the global economy and stock markets. 
                These tech giants are leaders in innovation, making them key drivers of market trends and investor sentiment. Accurate predictions of their stock performance can provide critical insights for individual investors, hedge funds, and financial institutions aiming to optimize their portfolios, minimize risks, and maximize returns. 
                Additionally, since FAANG stocks are highly volatile and sensitive to market conditions, regulatory changes, and technological advancements, having a reliable forecast can help investors make informed decisions, anticipate market shifts, and capitalize on potential opportunities in the tech sector. 
            </p>
            <h2> </h2>
                <div class ="flex-container">
                <div> Something </div>
                <div class="flex-container2">
                <div> Something else </div>
                </div>

                </div>
            </div>
            
<<<<<<< HEAD
            <h2 className="project-title">Stock Forecasting Tool</h2>
            <TechStack />
=======
>>>>>>> a1508353febe743f052cf65487e75b47dd5dafce


        </div>
    )
}