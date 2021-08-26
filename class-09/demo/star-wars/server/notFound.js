function notFound(request, response) {
  console.error('route not found');
  response.status(404).send('not found :(');
}


module.exports = notFound;