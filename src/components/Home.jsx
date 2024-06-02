import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Upcoming Events</h2>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>August 4</td>
                <td>NYSL Fundraiser</td>
              </tr>
              <tr>
                <td>August 16</td>
                <td>Season Kick-off: Meet the Teams</td>
              </tr>
              <tr>
                <td>September 1</td>
                <td>First Game of the Season</td>
              </tr>
            </tbody>
          </Table>
          <h2>Contact Information</h2>
          <p>Please email us at <a href="mailto:nysl@chisoccer.org">nysl@chisoccer.org</a></p>
          <p>We will reply to your email as soon as we can.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;