import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import data from '../gamesData.json';

const GameDetail = () => {
  const { id } = useParams();
  const [user, loading] = useAuthState(auth);
  const game = data.games[id];
  const location = data.locations[game.location];

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!user) {
    return (
      <Container>
        <Alert variant="info">
          Please <strong>Sign in</strong> to view the game details and gallery.
        </Alert>
        <Link to="/games">
          <Button className="btn-custom mt-3">&lt;Back</Button>
        </Link>
      </Container>
    );
  }

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
          <div className="d-flex justify-content-between mt-3">
            <Link to="/games" className="btn btn-primary btn-custom mt-3">&lt;Back</Link>
            <Link to={`/game/${id}/messages`} className="btn btn-primary btn-custom mt-3">
              Participate
            </Link>
            <Link to={`/game/${id}/gallery`} className="btn btn-primary btn-custom mt-3">
              View Gallery
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetail;
