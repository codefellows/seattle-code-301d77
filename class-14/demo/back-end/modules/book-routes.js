'use strict';

const handleServerError = require('./500-ServerError');
const getKey = require('../helpers/getKey');
const jwt = require('jsonwebtoken');
const Book = require('../models/book');

const BookRoutes = {
  list: getBooks,
  create: createBook,
  delete: deleteBook,
  update: updateBook,
  test: test,
}

async function test(request, response) {

  const token = request.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      response.send('invalid token');
    } else {
      response.send(user);
    }
  });
}


function getBooks(request, response) {
  const token = request.headers.authorization.split(' ')[1];
  // verify that the jwt is valid
  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      response.send('invalid token');
    } else {
      const email = request.query.email;
      // get the books from mongo 
      Book.find({ email }, (err, books) => {
        if (err) return console.error(err);
        response.send(books);
      })
    }
  });
}


function createBook(request, response) {
  const token = request.headers.authorization.split(' ')[1];
  // verify that the jwt is valid
  jwt.verify(token, getKey, {}, async function (err, user) {
    if (err) {
      response.send('invalid token');
    } else {
      const { name, email, description, status } = request.body;
      const bookInfo = { name, email, description, status };
      const newBook = await Book.create(bookInfo);
      response.send(newBook);
    }
  });
}

function deleteBook(request, response) {
  const token = request.headers.authorization.split(' ')[1];
  // verify that the jwt is valid
  jwt.verify(token, getKey, {}, async function (err, user) {
    if (err) {
      response.send('invalid token');
    } else {
      const email = request.query.email;
      const id = request.params.id;

      await Book.findByIdAndDelete(id);

      response.send('success');
    }
  });
}

function updateBook(request, response) {
  const token = request.headers.authorization.split(' ')[1];
  // verify that the jwt is valid
  jwt.verify(token, getKey, {}, async function (err, user) {

    if (err) {
      response.send('invalid token');
    } else {

      const { name, email, description, status } = request.body;

      try {

        const updatedBook = await Book.findByIdAndUpdate(request.params.id, { name, email, description, status }, { new: true, overwrite: true });
        response.send(updatedBook);
      } catch (error) {
        handleServerError(request, response, error);
      }
    }
  });
}

module.exports = BookRoutes;
