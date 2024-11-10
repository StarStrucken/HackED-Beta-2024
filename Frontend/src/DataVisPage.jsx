import "./DataVisPage.css"
import LineChartVis from "./LineChartVis"
import NavBar from "./NavBar"
import Histogram from "./Histogram"

export default function DataVisPage() {
    return (
        <div className="visualize-page">
            <NavBar />
            <LineChartVis />
            {/* <Histogram /> */}
            <div className="container2">
                    <div className="sbox"><p>Open:</p> The stock's price at the beginning of the trading session.</div>
                    <div className="sbox"><p>High:</p> The highest price the stock reached during that trading day.</div>
                    <div className="sbox"><p>Low:</p> The lowest price the stock dropped to within that trading session.</div>
            </div>
        </div>
    )
}