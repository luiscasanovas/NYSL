import React from 'react';
import { Table, Container } from 'react-bootstrap';
import data from '../gamesData.json';

const Schedule = () => {
  const { games, locations } = data;

  return (
    <Container>
      <h2>Schedule</h2>
      <Table striped bordered hover>
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
                <td>{game.teams.join(" vs ")}</td>
                <td>
                  {locationDetails.full_name}<br />
                  <small>{locationDetails.address}</small><br />
                  <a href={locationDetails.google_map_url} target="_blank" rel="noopener noreferrer">Map</a>
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