import React from 'react';

const Schedule = () => {
  const games = [
    { date: "2024-09-01", time: "09:30", teams: ["U1", "U4"], location: "katzenmaier" },
    { date: "2024-09-01", time: "13:00", teams: ["U3", "U2"], location: "greenbay" },
    { date: "2024-09-08", time: "09:30", teams: ["U5", "U6"], location: "howard_yeager" },
    { date: "2024-09-08", time: "13:00", teams: ["U6", "U1"], location: "marjorie_hart" },
    { date: "2024-09-15", time: "09:30", teams: ["U2", "U4"], location: "north" },
    { date: "2024-09-15", time: "13:00", teams: ["U3", "U5"], location: "katzenmaier" },
    { date: "2024-09-22", time: "09:30", teams: ["U1", "U3"], location: "south" },
    { date: "2024-09-22", time: "13:00", teams: ["U2", "U6"], location: "howard_yeager" },
    { date: "2024-09-29", time: "09:30", teams: ["U4", "U5"], location: "greenbay" },
  ];

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
          {games.map((game, index) => (
            <tr key={index}>
              <td>{game.date}</td>
              <td>{game.time}</td>
              <td>{game.teams.join(" vs ")}</td>
              <td>{game.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;