import React from 'react';
import data from '../gamesData.json';

const Schedule = () => {
  const { games, locations } = data;

  return (
    <div className="container">
      <h2>Schedule</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Teams</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => {
            const locationDetails = locations[game.location];
            return (
              <tr key={index}>
                <td>{game.date}</td>
                <td>{game.time}</td>
                <td>{game.teams.join(" vs ")}</td>
                <td>
                  {locationDetails.name}<br />
                  <small>{locationDetails.address}</small><br />
                  <a href={locationDetails.map_url} target="_blank" rel="noopener noreferrer">Map</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;