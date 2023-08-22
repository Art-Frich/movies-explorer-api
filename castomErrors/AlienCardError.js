const { ALIEN_MOVIE_TEXT, ALIEN_MOVIE_STATUS } = require('../helpers/constants');

class AlienMovieError extends Error {
  constructor() {
    super(ALIEN_MOVIE_TEXT);
    this.status = ALIEN_MOVIE_STATUS;
  }
}

module.exports = AlienMovieError;
