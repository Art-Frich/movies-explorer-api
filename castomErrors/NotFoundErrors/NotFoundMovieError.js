const { NOT_MOVIE_TEXT } = require('../../helpers/constants');
const NotFoundError = require('./NotFoundError');

class NotFoundMovieError extends NotFoundError {
  constructor() {
    super(NOT_MOVIE_TEXT);
  }
}

module.exports = NotFoundMovieError;
