import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import data from '../gamesData.json';

const GameDetail = () => {
  const { id } = useParams();
  const game = data.games[id];
  const location = data.locations[game.location];

  return (
    <Container>
      <Row>
        <Col>
          <h2>Game Details</h2>
          <p><strong>Date:</strong> {game.date}</p>
          <p><strong>Time:</strong> {game.time}</p>
          <p><strong>Teams:</strong> {game.teams.join(' vs ')}</p>
          <p><strong>Location:</strong> {location.name}</p>
          <p><strong>Address:</strong> {location.address}</p>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={location.map_url}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
           <Link to="/games">Back to Schedule</Link>
          <br/>
          <Link to={`/game/${id}/messages`} className="btn btn-primary mt-3">
            Participate
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetail;