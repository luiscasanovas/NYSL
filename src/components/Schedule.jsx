import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, InputGroup, FormControl, Button, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import data from '../gamesData.json';
import '../App.css';

const Schedule = () => {
  const [games, setGames] = useState({});
  const [locations, setLocations] = useState({});

  useEffect(() => {
    // Simulate fetching data
    setGames(data.games);
    setLocations(data.locations);
  }, []);

  return (
    <Container>
      <h2>Schedule</h2>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Teams</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(games).map((gameKey) => {
            const game = games[gameKey];
            const locationDetails = locations[game.location];
            return (
              <tr key={gameKey}>
                <td>{game.date}</td>
                <td>{game.time}</td>
                <td>
                  <Link to={`/game/${gameKey}`}>
                    {game.teams.join(" vs ")}
                  </Link>
                </td>
                <td>
                  {locationDetails.full_name}<br />
                  <small>{locationDetails.address}</small><br />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Schedule;