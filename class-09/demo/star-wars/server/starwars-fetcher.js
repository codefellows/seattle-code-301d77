const axios = require('axios');

async function fetchCharacters(request, response) {

  const url = 'https://swapi.dev/api/people';

  try {
    const apiResponse = await axios.get(url);
    response.send(apiResponse.data);
  } catch (error) {
    console.error(error);
    response.status(500).send('oh noes!!!');
  }

};

async function fetchShips(request, response) {

  const url = 'https://swapi.dev/api/starships';

  try {
    const apiResponse = await axios.get(url);
    response.send(apiResponse.data);
  } catch (error) {
    console.error(error);
    response.status(500).send('oh noes!!!');
  }

};

async function fetchPlanets(request, response) {

  const url = 'https://swapi.dev/api/planets';

  try {
    const apiResponse = await axios.get(url);
    response.send(apiResponse.data);
  } catch (error) {
    console.error(error);
    response.status(500).send('oh noes!!!');
  }

};

module.exports = {
  fetchCharacters: fetchCharacters,
  fetchShips: fetchShips,
  fetchPlanets: fetchPlanets
}