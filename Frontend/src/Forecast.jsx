import "./Forecast.css";
import NavBar from "./NavBar";
import axios from "axios";

export default function Forecast() {
    const getBackendResponse = async (event) => {
        event.preventDefault(); // Prevent any default behavior
    
        console.log("Button clicked");
    
        try {
            const response = await axios.get("http://localhost:5001/forecast", {
                params: { ticker: "AAPL" }, // Example ticker for testing
            });
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="page">
            <NavBar />
            <div className="forecast-page">
                <h1>Forecast Page</h1>
                <button type="button" onClick={getBackendResponse}>
                    Predict
                </button>
            </div>
        </div>
    );
}
