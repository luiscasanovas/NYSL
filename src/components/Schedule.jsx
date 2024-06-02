import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, ListGroup, Form, InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import data from '../gamesData.json';

const Schedule = () => {
    const [games, setGames] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setGames(data.games);
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGames = Object.keys(games).filter((gameKey) => {
        const game = games[gameKey];
        return game.teams.join(' vs ').toLowerCase().includes(searchTerm.toLowerCase()) ||
               data.locations[game.location].name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search games by teams or location"
                            onChange={handleSearchChange}
                            value={searchTerm}
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {filteredGames.map((gameKey) => {
                            const game = games[gameKey];
                            const locationDetails = data.locations[game.location];
                            return (
                                <ListGroup.Item action as={Link} to={`/game/${gameKey}`} key={gameKey}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{game.teams.join(" vs ")}</h5>
                                        <small>{locationDetails.name}</small>
                                    </div>
                                    <small>Date: {game.date} - Time: {game.time}</small>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Schedule;