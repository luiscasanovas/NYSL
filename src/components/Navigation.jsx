import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 
import logo from '../nysl_logo.png';  
const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Nav className="mx-auto">
          <NavLink to="/signin" className="nav-link">Sign In</NavLink>
          <NavLink to="/login" className="nav-link">Log In</NavLink>
        </Nav>

        <Navbar.Brand className="ms-auto" as={NavLink} to="/">
          <img
            src={logo}
            height="50"  
            className="d-inline-block align-top"
            alt="NYSL Logo"
          />
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/games">Schedule</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;