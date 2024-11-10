import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { DiCodeigniter } from "react-icons/di";
import CustomNavDropdown from "./CustomNavDropDown";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const goToHome = () => navigate("/");
  const goToVisualization = () => navigate("/visualize");
  const goToForecast = () => navigate("/forecast");

  // Load dark mode state from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });

  const handleToggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("isDarkMode", newDarkMode); // Save to localStorage
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <Navbar
      fixed="top"
      style={{
        backgroundColor: "linear-gradient(#6441a5, #2a0845)",
        color: "black",
        padding: "5px 10px",
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center",
      }}
      onClick={(e) => e.stopPropagation()} // Prevent unintended click propagation on Navbar.
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          onClick={goToHome}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          className="navbar-link"
        >
          <DiCodeigniter
            size={40}
            color="white"
            style={{ marginLeft: "10px", marginBottom: "15px" }}
          />
        </div>

        <div
          onClick={goToHome}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", color: "white", marginLeft: "10px" }}
        >
          <p
            className="navbar-link"
            style={{
              fontSize: "30px",
              fontFamily: "monospace",
              marginTop: "10px",
            }}
          >
            IDC
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Nav>
          <Nav.Link>
            <span
              onClick={goToVisualization}
              style={{ cursor: "pointer", color: "white", fontSize: "20px" }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  fontFamily: "monospace",
                  margin: "0",
                }}
              >
                Visualization
              </p>
            </span>
          </Nav.Link>

          <Nav.Link>
            <span
              onClick={goToForecast}
              style={{ cursor: "pointer", color: "white", fontSize: "20px" }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  fontFamily: "monospace",
                  margin: "0",
                }}
              >
                Forecast
              </p>
            </span>
          </Nav.Link>

          <CustomNavDropdown />
        </Nav>
        <div style={{ marginLeft: "15px", color: "white" }}>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={handleToggleDarkMode}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </Navbar>
  );
}
