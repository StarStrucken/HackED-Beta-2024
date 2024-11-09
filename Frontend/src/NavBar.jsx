import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { DiCodeigniter } from "react-icons/di";

export default function NavBar() {
  return (
    <>
      <Navbar
        fixed="top"
        style={{
          backgroundColor: "linear-gradient(#6441a5, #2a0845)",
          color: "black",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        
        <div style={{ display: "flex", alignItems: "center" }}>
        <Nav>
          <Nav.Link href="/" className="nav-link">
            <DiCodeigniter size={40} style={{ width: "30px"}}/>
          </Nav.Link>

          <Nav.Link href="/">
            <p style={{ width: "250px", fontSize: "30px", fontFamily: "monospace" }}>IDC</p>
          </Nav.Link>
        </Nav>
        </div>
            
      </Navbar>
    </>
  );
}