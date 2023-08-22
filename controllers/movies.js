const { SUCCES_CREATE_STATUS } = require('../helpers/constants');
const { checkExistence } = require('../helpers/utils');
const Movie = require('../models/moviesModel');
const NotFoundMovieError = require('../castomErrors/NotFoundErrors/NotFoundMovieError');
const AlienMovieError = require('../castomErrors/AlienCardError');

module.exports.getSavedMovie = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => res.send({
      data: movies.filter((film) => film.owner.toString() === req.user._id),
    }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    })
    .then((movie) => res.status(SUCCES_CREATE_STATUS).send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie
    .findById(req.params.movieId)
    .then((movie) => {
      checkExistence(movie, NotFoundMovieError);

      if (movie.owner.toString() === req.user._id) {
        return movie.deleteOne();
      }

      throw new AlienMovieError();
    })
    .then((data) => res.send({ data }))
    .catch(next);
};
