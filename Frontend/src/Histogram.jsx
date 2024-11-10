import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import './Histogram.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Histogram = () => {
    const [identifier, setIdentifier] = useState(""); 
    const [debouncedIdentifier, setDebouncedIdentifier] = useState("");
    const [data, setData] = useState(null); 
    const [chartKey, setChartKey] = useState(0);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "white",
                },
            },
            title: {
                display: true,
                text: "Volume Over Time",
                color: "white",
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "white",
                },
                title: {
                    display: true,
                    text: "Months",
                    color: "white",
                },
            },
            y: {
                ticks: {
                    color: "white",
                },
                title: {
                    display: true,
                    text: "Volume",
                    color: "white",
                },
            },
        },
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedIdentifier(identifier);
        }, 500);

        return () => clearTimeout(handler);
    }, [identifier]);

    const fetchData = async () => {
        if (!debouncedIdentifier) return;

        try {
            const response = await fetch('http://localhost:5001/data', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier: debouncedIdentifier,
                    columns: ["Volume"],
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const jsonData = await response.json();

            if (jsonData.data) {
                const labels = Object.keys(jsonData.data.Volume);
                const volumeData = Object.values(jsonData.data.Volume);

                // Update chart data only if new data is valid
                if (labels.length > 0 && volumeData.length > 0) {
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
                    setChartKey((prevKey) => prevKey + 1);
                }
            } else {
                setData({
                    labels: ["Placeholder"],
                    datasets: [
                        {
                            label: "Volume",
                            data: [0],
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
        fetchData();
    }, [debouncedIdentifier]);

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
                    color: "black",
                }}
            />
            <div>
                {data && (
                    <Bar
                        key={chartKey}
                        data={data}
                        options={options}
                        style={{ margin: "auto", width: "700px", height: "700px", marginTop: "50px" }}
                    />
                )}
            </div>
        </div>
    );
};

export default Histogram;
