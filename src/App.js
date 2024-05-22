import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Navigation from './components/Navigation';


function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Schedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;