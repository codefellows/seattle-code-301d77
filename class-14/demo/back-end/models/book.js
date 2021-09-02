'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, uppercase: true, enum: ['LIFE-CHANGING', 'FAVORITE FIVE', 'RECCOMENDED TO ME'] },
});


const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;