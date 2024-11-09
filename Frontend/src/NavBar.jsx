import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { DiCodeigniter } from "react-icons/di";
import NavDropdown from "react-bootstrap/NavDropdown";
export default function NavBar() {
    const showTeam = () => {
        console.log("team");
    }

    const showTechStack = () => {
        console.log("tech stack");
    }


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
            <p style={{display: "flex", alignItems: "center", marginRight: "950px", fontSize: "30px", fontFamily: "monospace", marginTop: "5px"}}>IDC</p>
          </Nav.Link>


          <Nav.Link href="/">
            <p style={{display: "flex", alignItems: "center", fontSize: "20px", fontFamily: "monospace", marginTop: "10px"}}>Visualization</p>
          </Nav.Link>

          <Nav.Link href="/">
            <p style={{display: "flex", alignItems: "center", fontSize: "20px", fontFamily: "monospace", marginTop: "10px"}}>Forecast</p>
          </Nav.Link>

          <NavDropdown title="About" id="about-dropdown" style={{ fontSize: "20px", fontFamily: "monospace", marginTop: "10px"}}>
            <NavDropdown.Item style={{ fontSize: "20px", fontFamily: "monospace", marginBottom: "10px"}} onclick={showTeam}>Team</NavDropdown.Item>
            <NavDropdown.Item style={{ fontSize: "20px", fontFamily: "monospace"}} onclick={showTechStack}>Tech Stack</NavDropdown.Item>
          </NavDropdown>

        
        </Nav>
        </div>
            
      </Navbar>
    </>
  );
}