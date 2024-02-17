import React from "react";
import { useDispatch } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaGithub, FaGitSquare, FaOutdent } from "react-icons/fa"; // Import FaOutdent icon
import "./styles.css";
import { logoutUser as logout } from "../../actions/authActions";

const Header = ({ isLoggedIn }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand as={Link} to="/" className="navbar-brand-link">
        DNS Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="nav-links">
        <Nav className="mr-auto">
          <Nav.Link
            href="https://github.com/Dhruvermafz"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Account"
          >
            <FaGithub />
          </Nav.Link>
          <Nav.Link
            href="https://github.com/Dhruvermafz/dns-manager"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
          >
            <FaGitSquare />
          </Nav.Link>
        </Nav>
        {isLoggedIn && (
          <Nav>
            <Nav.Link
              onClick={handleLogout}
              className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-200 transition rounded-sm"
            >
              <FaOutdent /> Logout {/* Add FaOutdent icon here */}
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
