import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { LinearScale } from "chart.js";
import { BarElement } from "chart.js";
import { Title } from "chart.js";
import { Tooltip } from "chart.js";
import { Legend } from "chart.js";
import { useEffect, useState } from "react";
import './Histogram.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Histogram = () => {
    const [identifier, setIdentifier] = useState(""); // State for identifier input
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Volume",
                data: [],
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 1)",
                borderWidth: 1,
            },
        ],
    });

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: "white", // Label color for legend
                },
            },
            title: {
                display: true,
                text: "Volume Over Time",
                color: "white", // Title color
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "white", // X-axis label color
                },
                title: {
                    display: true,
                    text: "Months",
                    color: "white", // X-axis title color
                },
            },
            y: {
                ticks: {
                    color: "white", // Y-axis label color
                },
                title: {
                    display: true,
                    text: "Volume",
                    color: "white", // Y-axis title color
                },
            },
        },
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5001/data', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier: identifier, // Sending identifier in the body
                    columns: ["Volume"] // Request specific columns
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const jsonData = await response.json();
    
            if (jsonData.data) {
                const labels = Object.keys(jsonData.data.Volume); // Get months or date labels
                const volumeData = Object.values(jsonData.data.Volume); // Get volume values
    
                setData({
                    labels,
                    datasets: [
                        {
                            label: "Volume",
                            data: volumeData,
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            borderColor: "rgba(255, 255, 255, 1)",
                            borderWidth: 1,
                        },
                    ],
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    

    useEffect(() => {
        if (identifier) {
            fetchData();
        }
    }, [identifier]);

    return (
        <div style={{ textAlign: "center", color: "white" }}>
            <h1>Stock Volume Visualization</h1>
            <input
                type="text"
                placeholder="Enter stock ticker (e.g., AAPL)"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    color: "black"
                }}
            />
            <button
                onClick={fetchData}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    margin: "10px",
                    cursor: "pointer",
                }}
                className="fetch-data-button"
            >
                Fetch Data
            </button>
            <div>
                <Bar
                    data={data}
                    options={options}
                    style={{ margin: "auto", width: "700px", height: "700px", marginTop: "50px" }}
                />
            </div>
        </div>
    );
};

export default Histogram;
