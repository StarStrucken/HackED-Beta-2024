import { useState } from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import './CustomNavDropdown.css';

export default function CustomNavDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="dropdown-hover"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavDropdown
        title={<span style={{ color: "white" }}>About</span>}
        id="about-dropdown"
        className="custom-nav-dropdown"
        show={isOpen}
        style={{
          fontSize: "20px",
          fontFamily: "monospace",
          height: "40px"
        }}
      >
        <NavDropdown.Item
          style={{ fontSize: "20px", fontFamily: "monospace" }}
          href="#tech-stack"
        >
          <Nav.Link href="#tech-stack">Tech Stack</Nav.Link>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          style={{
            fontSize: "20px",
            fontFamily: "monospace",
            marginBottom: "10px",
          }}
          href="#team"
        >
          <Nav.Link href="#team">Team</Nav.Link>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};