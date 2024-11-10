// App component

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import StartPage from './StartPage';
import Forecast from './Forecast';
import DataVisPage from './DataVisPage';
import ScrollToTopOnRouteChange from './scroll';

// Function to scroll to a section
function ScrollToSection() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const section = document.getElementById(hash.substring(1));
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToSection />
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/visualize" element={<DataVisPage />} />
      </Routes>
    </Router>
  );
}

export default App;