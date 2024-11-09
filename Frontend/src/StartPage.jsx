import React from "react";
import "./StartPage.css"
import "./DataVisPage"
import NavBar from "./NavBar";
import DataVisPage from "./DataVisPage";

export default function StartPage() {
    return (
        
        <div className="page">
            <NavBar />
            <p className="project-title">Global Renewable Energy Forecasting and Optimization Tool</p>
        </div>
    )
}