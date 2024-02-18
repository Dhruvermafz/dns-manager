import React from "react";
import { useDispatch } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaGithub, FaGitSquare, FaSignOutAlt } from "react-icons/fa";
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

      <Nav className="nav-links">
        <Nav.Link
          href="https://github.com/Dhruvermafz"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Account"
          className="nav-link"
        >
          <FaGithub className="icon" />
          GitHub Account
        </Nav.Link>
        <Nav.Link
          href="https://github.com/Dhruvermafz/dns-manager"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Repository"
          className="nav-link"
        >
          <FaGitSquare className="icon" />
          GitHub Repository
        </Nav.Link>
        {isLoggedIn && (
          <Nav.Link onClick={handleLogout} className="nav-link logout-link">
            <FaSignOutAlt className="icon" />
            Logout
          </Nav.Link>
        )}
        <Nav.Link as={Link} to="/about" className="nav-link">
          About
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
