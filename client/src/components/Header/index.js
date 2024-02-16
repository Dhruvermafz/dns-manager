import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./styles.css";
const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand as={Link} to="/" className="header-logo">
        DNS Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
