'use strict';

module.exports = (request, response, error) => {
  console.log(error);
  response.status(500).send('server error');
}