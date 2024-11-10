import "./DataVisPage.css"
import LineChartVis from "./LineChartVis"
import NavBar from "./NavBar"
import Histogram from "./Histogram"

export default function DataVisPage() {
    return (
        <div className="visualize-page">
            <NavBar />
            <LineChartVis />
            <Histogram />
        </div>
    )
}