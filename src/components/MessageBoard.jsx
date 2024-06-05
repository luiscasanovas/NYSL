import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import messagesData from '../messagesData.json'; 
import gamesData from '../gamesData.json'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const MessageBoard = () => {
    const { id } = useParams();
    const [user, loading, error] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (messagesData.messages[id]) {
            const gameMessages = messagesData.messages[id];
            const sortedMessages = Object.values(gameMessages).sort((a, b) => a.timestamp - b.timestamp);
            setMessages(sortedMessages);
        }
    }, [id]);

    return (
        <Container>
            <h2>{gamesData.games[id].teams.join(' vs ')}</h2>
            <ListGroup>
                {messages.map((msg, index) => (
                    <ListGroup.Item key={index}>
                        <strong>{msg.author}</strong>: {msg.text}
                        <br />
                        <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Write a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => {
                        if (!newMessage.trim()) {
                            alert("Please enter a message before sending.");
                            return;
                        }
                        console.log("Send message:", newMessage); 
                        setNewMessage(''); 
                    }}>
                        Send
                    </Button>
                    <Link to={`/game/${id}`} className="btn btn-primary">
                        Back to Game Details
                    </Link>
                </div>
            </Form>
        </Container>
    );
};

export default MessageBoard;