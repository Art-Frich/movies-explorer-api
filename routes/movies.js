const router = require('express').Router();
const { celebrate } = require('celebrate');

const { addMovieSchema, checkMovieIdSchema } = require('../celebrateValidation/celebrateSchems');
const { getSavedMovie, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getSavedMovie);
router.post('/', celebrate(addMovieSchema), createMovie);
router.delete('/:movieId', celebrate(checkMovieIdSchema), deleteMovie);

module.exports = router;
