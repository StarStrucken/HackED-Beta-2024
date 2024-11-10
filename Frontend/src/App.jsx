import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage';
import Forecast from './Forecast';
import DataVisPage from './DataVisPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/" element={<StartPage />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/visualize" element={<DataVisPage />} />
      </Routes>
    </Router>
  );
}

export default App;

