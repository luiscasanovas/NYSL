import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Upcoming Events</h2>
          <ListGroup>
            <ListGroup.Item>August 4 - NYSL Fundraiser</ListGroup.Item>
            <ListGroup.Item>August 16 - Season Kick-off: Meet the Teams</ListGroup.Item>
            <ListGroup.Item>September 1 - First Game of the Season</ListGroup.Item>
          </ListGroup>
          <h2>Contact Information</h2>
          <p>Please email us at <a href="mailto:nysl@chisoccer.org">nysl@chisoccer.org</a></p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;