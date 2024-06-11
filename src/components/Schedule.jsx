import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import data from '../gamesData.json';

const Schedule = () => {
    const [games, setGames] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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

    const handleGameClick = (gameKey) => {
        navigate(`/game/${gameKey}`);
    };

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <h2>Schedule</h2> 
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search games by teams or location"
                            onChange={handleSearchChange}
                            value={searchTerm}
                        />
                        <Button variant="outline-secondary" id="button-addon2" className="btn-custom">
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
                                <ListGroup.Item 
                                    action 
                                    as="button"
                                    onClick={() => handleGameClick(gameKey)}
                                    key={gameKey}
                                >
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
