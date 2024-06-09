import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { useList } from 'react-firebase-hooks/database';
import { auth, database, storage, set, ref as dbRef } from '../firebase';
import gamesData from '../gamesData.json';
import '../App.css';

const Gallery = () => {
    const { id } = useParams();
    const [user, loading] = useAuthState(auth);
    const [newPicture, setNewPicture] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [error, setError] = useState(null);

    const game = gamesData.games[id];
    const teams = game ? game.teams.join(' vs ') : 'Unknown Teams';

    const picturesRef = ref(storage, `pictures/${id}`);

    useEffect(() => {
        const fetchPictures = async () => {
            try {
                const result = await listAll(picturesRef);
                const urls = await Promise.all(result.items.map(item => getDownloadURL(item)));
                setPictures(urls);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPictures();
    }, [id]);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setNewPicture(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!newPicture) return;

        const pictureRef = ref(storage, `pictures/${id}/${newPicture.name}`);
        try {
            await uploadBytes(pictureRef, newPicture);
            const url = await getDownloadURL(pictureRef);
            setPictures(prev => [...prev, url]);

            const newPictureRef = dbRef(database, `pictures/${id}`).push();
            await set(newPictureRef, {
                author: user.email,
                url,
                timestamp: Date.now()
            });

            setNewPicture(null);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <Container>Loading...</Container>;
    }

    if (!user) {
        return (
            <Container>
                <Alert variant="info">
                    Please <strong>Sign in</strong> to view and participate in the gallery.
                </Alert>
            </Container>
        );
    }

    return (
        <Container>
            <h2>{teams}</h2>
            <Form className="mb-3">
                <Form.Group>
                    <Form.Control type="file" onChange={handleFileChange} className="mb-2" />
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button onClick={handleUpload} disabled={!newPicture} className="btn-custom">
                        Upload
                    </Button>
                    <Link to={`/game/${id}`} className="btn btn-primary">
                        &lt;Back
                    </Link>
                </div>
            </Form>
            <Row>
                {pictures.map((url, index) => (
                    <Col key={index} xs={12} md={6} lg={4} className="pb-3">
                        <img src={url} alt="Game" className="img-fluid" />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Gallery;
