const express = require('express');
const cors = require('cors');

// note the alternate syntax here
require('dotenv').config();

const app = express();
app.use(cors());


const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('howdy from home route');
});

app.get('/shopping-list', (request, response) => {
  response.send(['salami', 'prosciutto', 'soap']);
});

// say hi to given person
// E.g. call http://localhost:3001/say-hi?person=Hexx
app.get('/say-hi', (request, response) => {
  const personToGreet = request.query.person;
  response.send(`Hi there ${personToGreet}`);
});

// if a get request to any other path there is a problem
app.get('*', (request, response) => {
  response.status(404).send('not found');
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))