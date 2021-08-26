'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fetchCharacters, fetchPlanets, fetchShips } = require('./starwars-fetcher');
const notFound = require('./notFound');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());


// routes
app.get('/characters', fetchCharacters);
app.get('/ships', fetchShips);
app.get('/planets', fetchPlanets);
app.get('*', notFound);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));