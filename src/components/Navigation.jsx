import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle, signOutUser } from '../firebase';

const Navigation = () => {
    const [user, loading] = useAuthState(auth);

    return (
        <Navbar style={{ backgroundColor: '#0F4844ff' }}>
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/">
                    <img
                        src={`${process.env.PUBLIC_URL}/nysl_logo.png`}
                        height="50"
                        className="d-inline-block align-top"
                        alt="NYSL Logo"
                    />
                </Navbar.Brand>
                <Nav className="me-auto">
                    
                </Nav>
                <Nav className="ms-auto">
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
            </Container>
        </Navbar>
    );
};

export default Navigation;
