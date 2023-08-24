const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = require('../configEnv');
const { NOT_AUTH_TEXT } = require('../helpers/constants');
const AuthError = require('../castomErrors/AuthError');

module.exports = (req, res, next) => {
  const err = new AuthError(NOT_AUTH_TEXT);
  let payload;

  try {
    const token = req.cookies.jwt;

    // .verify выкинет ошибку при несоответствии
    payload = jwt.verify(token, JWT_SECRET);
  } catch (_) {
    throw err;
  }

  req.user = payload;

  next();
};
