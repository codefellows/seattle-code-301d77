'use strict';

module.exports = (request, response) => {
  response.status(404).send('page not found');
}