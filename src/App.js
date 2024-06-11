import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Schedule from './components/Schedule';
import GameDetail from './components/GameDetail';
import MessageBoard from './components/MessageBoard';
import Gallery from './components/Gallery';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
    return (
        <Router>
            <Navigation />
            <Container className="mt-4">
                <Routes>
                    <Route path="/" element={<Schedule />} />
                    <Route path="/games" element={<Schedule />} />
                    <Route path="/game/:id" element={<GameDetail />} />
                    <Route path="/game/:id/messages" element={<MessageBoard />} />
                    <Route path="/game/:id/gallery" element={<Gallery />} />
                </Routes>
            </Container>
            <footer className="text-center mt-4">
                <h2>Contact Information</h2>
                <p>Please email us at <a href="mailto:nysl@chisoccer.org">nysl@chisoccer.org</a></p>
            </footer>
        </Router>
    );
}

export default App;
