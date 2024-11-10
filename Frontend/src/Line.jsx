import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components used by Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  // Data for the Line Chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [12000, 15000, 10000, 17000, 22000, 18000],
        borderColor: 'rgba(255, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(255, 192, 192, 0.2)', // Fill color under the line
        pointBackgroundColor: 'rgba(255, 192, 192, 1)', // Point color
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 0, 192, 1)',
        borderWidth: 2,
        tension: 0.3, // Smooth curve
        fill: true,
      },
    ],
  };

  // Options for the Line Chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Revenue Line Chart',
        color: 'white',
        font:{
            size: 15,
        }
      },
    },
    scales: {
      x: {
        ticks: {
            color: 'white',
            font:{
                size: 15,
            },
        },
        grid: {
            color: 'white',
        },
        title: {
          display: true,
          text: 'Months',
          color: 'white',
          font: {
            size: 15,
          }
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
            color: 'white',
            font: {
                size: 15,
            }
        },
        grid: {
            color: 'white',
        },
        title: {
          display: true,
          text: 'Revenue ($)',
          color: 'white',
          font: {
            size: 15,
          }
        },
      },
    },
  };

  return (
    <div style={{ width: '900px', margin: 'auto', height: '600px', paddingTop: '20px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
