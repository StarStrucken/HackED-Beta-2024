import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage';
import Forecast from './Forecast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />

        <Route path="/forecast" element={<Forecast />} />
      </Routes>
    </Router>
  );
}

export default App;

