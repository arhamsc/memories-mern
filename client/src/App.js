import React from 'react';

import { Container } from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    return (
        <Container maxWidth="lg">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Container>
    );
};

export default App;
