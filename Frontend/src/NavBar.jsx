import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { DiCodeigniter } from "react-icons/di";
import NavDropdown from "react-bootstrap/NavDropdown";
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
            <DiCodeigniter size={40} style={{ width: "30px", marginLeft: "10px", marginTop: "5px"}}/>
          </Nav.Link>

          <Nav.Link href="/">
            <p style={{display: "flex", alignItems: "center", marginRight: "920px", fontSize: "30px", fontFamily: "monospace", marginTop: "5px"}}>IDC</p>
          </Nav.Link>


          <Nav.Link href="/visualization">
            <p style={{display: "flex", alignItems: "center", fontSize: "20px", fontFamily: "monospace", marginTop: "10px"}} onclick={goToVisualization}>Visualization</p>
          </Nav.Link>

          <Nav.Link href="/forecast">
            <p style={{display: "flex", alignItems: "center", fontSize: "20px", fontFamily: "monospace", marginTop: "10px"}} onclick={goToForecast}>Forecast</p>
          </Nav.Link>

          <NavDropdown title="About" id="about-dropdown" style={{ fontSize: "20px", fontFamily: "monospace", marginTop: "10px"}}>
            <NavDropdown.Item style={{ fontSize: "20px", fontFamily: "monospace", marginBottom: "10px"}} href="#team">Team</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item style={{ fontSize: "20px", fontFamily: "monospace"}} href="#tech">Tech Stack</NavDropdown.Item>
          </NavDropdown>

        
        </Nav>
        </div>
            
      </Navbar>
    </>
  );
}