import React from "react";
import "./StartPage.css"
import "./DataVisPage"
import NavBar from "./NavBar";

export default function StartPage() {
    return (
        <div className="page">
            <NavBar />
            <div>
                <h1 className="project-title"> Stock Forecasting Tool</h1>
            <p>This tool predicts stock prices using advanced algorithms and historical data. Enter the stock symbol below to get started!</p>
            
            </div>
            


        </div>
    )
}