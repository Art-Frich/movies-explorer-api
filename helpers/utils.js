const jwt = require('jsonwebtoken');
const NotFoundRouteError = require('../castomErrors/NotFoundErrors/NotFoundRouteError');
require('dotenv').config();

module.exports.handleOtherRouts = (req, res, next) => next(new NotFoundRouteError());
const NotFoundError = require('../castomErrors/NotFoundErrors/NotFoundError');
const UncorrectDataError = require('../castomErrors/UncorrectDataError');
const {
  fullerConsoleLine, ERROR_DEFAULT_TEXT, ERROR_DEFAULT_STATUS, MONGO_CONFLICT_STATUS,
} = require('./constants');
const UserAlreadyExistError = require('../castomErrors/UserAlreadyExistError');

module.exports.handleStartServerConsole = (PORT) => {
  // eslint-disable-next-line no-console
  console.log(`${fullerConsoleLine}\nApp listening on port  ${PORT}`);
};

module.exports.handleAppError = (err) => {
  // eslint-disable-next-line no-console
  console.log(`Произошла ошибка: ${err.name} ${err.message}. \n${err.stack}`);
};

const checkExistence = (object, Err = NotFoundError) => {
  if (!object) {
    throw new Err();
  }
};
module.exports.checkExistence = checkExistence;

module.exports.checkHandleSend = (promise, res, next, Err = NotFoundError) => {
  promise
    .then((data) => {
      checkExistence(data, Err);
      res.send({ data });
    })
    .catch((err) => {
      if (err.code === MONGO_CONFLICT_STATUS) {
        next(new UserAlreadyExistError());
      } else if (err.name === 'ValidationError') {
        next(new UncorrectDataError());
      } else {
        next(err);
      }
    });
};

module.exports.tokenCreate = (id, ageToken = '7d') => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  const token = jwt.sign(
    { _id: id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    { expiresIn: ageToken },
  );

  return token;
};

// eslint-disable-next-line no-unused-vars
module.exports.sendError = (err, req, res, next) => {
  const {
    status = ERROR_DEFAULT_STATUS,
    message = ERROR_DEFAULT_TEXT,
  } = err;

  res
    .status(status)
    .send({ message });
};
