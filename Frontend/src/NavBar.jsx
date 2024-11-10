import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { DiCodeigniter } from "react-icons/di";
import CustomNavDropdown from "./CustomNavDropDown";
import "./NavBar.css";

export default function NavBar() {
  const goToVisualization = () => {
    window.location.href = "/visualization";
  };

  const goToForecast = () => {
    window.location.href = "/forecast";
  };
  return (
    <>
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
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Nav>
            <Nav.Link href="/" className="nav-link">
              <DiCodeigniter
                size={40}
                color="white"
                style={{ width: "30px", marginLeft: "10px", marginTop: "5px" }}
              />
            </Nav.Link>

            <Nav.Link href="/">
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "910px",
                  fontSize: "30px",
                  fontFamily: "monospace",
                  marginTop: "5px",
                  color: "white",
                }}
              >
                IDC
              </p>
            </Nav.Link>

            <Nav.Link href="/visualization">
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  fontFamily: "monospace",
                  marginTop: "10px",
                  color: "white",
                }}
                onClick={goToVisualization}
              >
                Visualization
              </p>
            </Nav.Link>

            <Nav.Link href="/forecast">
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  fontFamily: "monospace",
                  marginTop: "10px",
                  color: "white",
                }}
                onClick={goToForecast}
              >
                Forecast
              </p>
            </Nav.Link>

            <CustomNavDropdown />
          </Nav>
        </div>
      </Navbar>
    </>
  );
}
