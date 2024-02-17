import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaGithub, FaGitSquare } from "react-icons/fa";
import "./styles.css";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand as={Link} to="/" className="navbar-brand-link">
        DNS Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="nav-links">
        <Nav className="mr-auto"></Nav>
        <Nav>
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
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
