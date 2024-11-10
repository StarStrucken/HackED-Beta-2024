import "./DataVisPage.css"
import LineChart from "./Line"
import NavBar from "./NavBar"
import Histogram from "./Histogram"

export default function DataVisPage() {
    return (
        <div className="visualize-page">
            <NavBar />
            <LineChart />
            <Histogram />
        </div>
    )
}