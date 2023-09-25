const mongoose = require('mongoose');
const { EXPECTED_URL_TEXT, regExpUrl } = require('../helpers/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
    validate: {
      validator: (value) => regExpUrl.test(value),
      message: EXPECTED_URL_TEXT,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regExpUrl.test(value),
      message: EXPECTED_URL_TEXT,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regExpUrl.test(value),
      message: EXPECTED_URL_TEXT,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
    // кажется, оно не работает
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const movieModel = mongoose.model('movie', movieSchema);
module.exports = movieModel;
