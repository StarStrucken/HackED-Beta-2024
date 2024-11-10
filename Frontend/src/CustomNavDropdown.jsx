import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomNavDropdown.css';

export default function CustomNavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    if (location.pathname === '/') {
      // If already on StartPage, scroll directly
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to StartPage, then scroll
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div
      className="dropdown-hover"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavDropdown
        title={<span style={{ color: 'white' }}>About</span>}
        id="about-dropdown"
        className="custom-nav-dropdown"
        show={isOpen}
        style={{
          fontSize: '20px',
          fontFamily: 'monospace',
          height: '40px',
        }}
      >
        <NavDropdown.Item
          onClick={() => handleNavClick('tech-stack')}
          style={{ fontSize: '20px', fontFamily: 'monospace' }}
        >
          Tech Stack
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          onClick={() => handleNavClick('team')}
          style={{ fontSize: '20px', fontFamily: 'monospace' }}
        >
          Team
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}