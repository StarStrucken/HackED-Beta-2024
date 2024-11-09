import React from "react";
import "./StartPage.css"
import "./DataVisPage"
import NavBar from "./NavBar";

export default function StartPage() {
    return (
        <div className="page">
            <NavBar />
            <p className="project-title">Global Renewable Energy Forecasting and Optimization Tool</p>
        </div>
    )
}