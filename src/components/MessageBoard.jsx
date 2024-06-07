import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useList } from 'react-firebase-hooks/database';
import { auth, database, ref, push, set } from '../firebase';
import gamesData from '../gamesData.json';
import '../App.css'; 

const MessageBoard = () => {
    const { id } = useParams();
    const [user, loading] = useAuthState(auth);
    const [newMessage, setNewMessage] = useState('');
    const messagesRef = ref(database, `messages/${id}`);
    const [messagesSnapshot, loadingMessages, errorMessages] = useList(messagesRef);

    const messages =
        messagesSnapshot ? 
            messagesSnapshot
                .map(snapshot => ({
                    id: snapshot.key,
                    ...snapshot.val()
                }))
                .sort((a, b) => a.timestamp - b.timestamp)
                .filter((message, index, self) => 
                    index === self.findIndex((msg) => msg.id === message.id)
                ) : [];

    const handleSendMessage = useCallback(async () => {
        if (!user) {
            alert("Please Sign in to send messages.");
            return;
        }
        if (newMessage.trim() === '') return;

        const messageToSend = newMessage;
        setNewMessage(''); 

        try {
            const newMessageRef = push(messagesRef);
            await set(newMessageRef, {
                author: user.email,
                text: messageToSend,
                timestamp: Date.now()
            });
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    }, [user, newMessage, messagesRef]);

    useEffect(() => {
        setNewMessage('');
    }, [id]);

    useEffect(() => {
        const messagesContainer = document.querySelector('.messages-container');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, [messages]);

    if (loading || loadingMessages) {
        return <Container>Loading...</Container>;
    }

    if (!user) {
        return (
            <Container>
                <Alert variant="info">
                    Please <strong>Sign in</strong> to view and participate in the message board.
                </Alert>
            </Container>
        );
    }

    if (errorMessages) {
        return (
            <Container>
                <Alert variant="danger">
                    Error: {errorMessages.message}
                </Alert>
            </Container>
        );
    }

    return (
        <Container>
            <h2>{gamesData.games[id].teams.join(' vs ')}</h2>
            <div className="messages-container">
                <ListGroup>
                    {messages.map((msg) => (
                        <ListGroup.Item key={msg.id}>
                            <strong>{msg.author}</strong>: {msg.text}
                            <br />
                            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
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
                    <Button variant="primary" onClick={handleSendMessage}>
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
