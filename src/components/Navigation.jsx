import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import logo from '../nysl_logo.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle, signOutUser } from '../firebase';

const Navigation = () => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation(); 
  const isGameDetailPage = () => {
    return /\/game\/[^/]+$/.test(location.pathname); 
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Nav className="mx-auto">
          {user ? (
            <Button className="btn-custom nav-link" onClick={signOutUser}>
              Sign Out
            </Button>
          ) : (
            <Button className="btn-custom nav-link" onClick={signInWithGoogle}>
              Sign In with Google
            </Button>
          )}
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
            {user && isGameDetailPage() && (
              <Nav.Link as={NavLink} to={`${location.pathname}/messages`}>
                Messages
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;