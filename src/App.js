import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Schedule from './components/Schedule';
import GameDetail from './components/GameDetail';
import Navigation from './components/Navigation';
import MessageBoard from './components/MessageBoard';
import Gallery from './components/Gallery'; 

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Schedule />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/game/:id/messages" element={<MessageBoard />} />
          <Route path="/game/:id/gallery" element={<Gallery />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
