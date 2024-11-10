import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { DiCodeigniter } from "react-icons/di";
import CustomNavDropdown from "./CustomNavDropDown";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const goToHome = () => navigate("/");
  const goToVisualization = () => navigate("/visualize");
  const goToForecast = () => navigate("/forecast");

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
      onClick={(e) => e.stopPropagation()} 
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div onClick={goToHome} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
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
            style={{
              fontSize: "30px",
              fontFamily: "monospace",
              color: "white",
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
                  color: "white",
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
                  color: "white",
                }}
              >
                Forecast
              </p>
            </span>
          </Nav.Link>

          <CustomNavDropdown />
        </Nav>
      </div>
    </Navbar>
  );
}
