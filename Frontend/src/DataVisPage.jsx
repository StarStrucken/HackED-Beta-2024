import React from 'react';
import LineChart from './Line';

import "./DataVisPage.css"

export default function DataVisPage() {
    return (
        
        <div>
            <h1>Forecast Adjusted close price</h1>
            <LineChart />
        </div>
    )
}