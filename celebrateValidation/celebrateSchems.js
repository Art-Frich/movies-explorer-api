const { Joi } = require('celebrate');
const {
  nameSchema, emailSchema, linkSchema, reqStrSchema, reqNumSchema, userIdSchema, objectIdSchema,
} = require('./celebrateValidateParams');

module.exports.signinSchema = {
  body: Joi.object().keys({
    email: emailSchema,
    password: reqStrSchema,
  }),
};

module.exports.signupSchema = {
  body: Joi.object().keys({
    name: nameSchema,
    email: emailSchema,
    password: reqStrSchema,
  }),
};

module.exports.updUserSchema = {
  body: Joi.object().keys({
    name: nameSchema,
    email: emailSchema,
  }),
};

module.exports.addMovieSchema = {
  body: Joi.object().keys({
    country: reqStrSchema,
    director: reqStrSchema,
    duration: reqNumSchema,
    year: reqStrSchema,
    description: reqStrSchema,
    image: linkSchema,
    trailerLink: linkSchema,
    thumbnail: linkSchema,
    owner: objectIdSchema,
    movieId: reqNumSchema,
    nameRU: reqStrSchema,
    nameEN: reqStrSchema,
  }),
};

module.exports.checkMovieIdSchema = {
  params: Joi.object().keys({
    movieId: objectIdSchema,
  }),
};
