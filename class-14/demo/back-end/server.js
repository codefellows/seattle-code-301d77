'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const BookRoutes = require('./modules/book-routes');
const handleNotFound = require('./modules/404-NotFound');

const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/books');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', _ => {
  console.log('We\'re connected!');
});

const PORT = process.env.PORT || 3001;

app.get('/books', BookRoutes.list);
app.post('/books', BookRoutes.create);
app.delete('/books/:id', BookRoutes.delete);
app.put('/books/:id', BookRoutes.update);
app.get('/test', BookRoutes.test);

app.use('*', handleNotFound);

app.listen(PORT, () => console.log(`listening on ${PORT}`));