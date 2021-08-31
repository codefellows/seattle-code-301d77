const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Cat = require('./models/cat');

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json()); // middleware: parses the body

mongoose.connect(process.env.DATABASE_URL);

app.get('/cats', async (request, response) => {

  const filterQuery = {};

  if (request.query.location) {
    filterQuery.location = request.query.location;
  }

  const cats = await Cat.find(filterQuery);

  response.send(cats);
});

app.post('/cats', async (request, response) => {

  // TODO: error handling

  const newCat = await Cat.create(request.body);

  response.status(201).send(newCat);
});

app.delete('/cats/:id', async (request, response) => {
  // TODO error handling
  await Cat.findByIdAndDelete(request.params.id);
  response.send(204).send('success')
});

app.listen(PORT, () => console.log('Listening on PORT', PORT));


