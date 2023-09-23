const bcrypt = require('bcryptjs');
const { checkHandleSend, tokenCreate } = require('../helpers/utils');
const User = require('../models/userModel');
const NotFoundUserError = require('../castomErrors/NotFoundErrors/NotFoundUserError');
const UserAlreadyExistError = require('../castomErrors/UserAlreadyExistError');
const {
  SUCCES_CREATE_STATUS,
  MONGO_CONFLICT_STATUS,
  newCookieOptions,
  oldCookieOptions,
  LOGOUT_SUCC,
} = require('../helpers/constants');
const UncorrectDataError = require('../castomErrors/UncorrectDataError');

module.exports.getUserData = (req, res, next) => {
  checkHandleSend(User.findById(req.user._id), res, next, NotFoundUserError);
};

module.exports.updUserData = (req, res, next) => {
  const { name, email } = req.body;
  checkHandleSend(
    User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    ),
    res,
    next,
    NotFoundUserError,
  );
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 16)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((newUser) => {
      res.status(SUCCES_CREATE_STATUS).send({
        data: {
          _id: newUser._id,
          name,
          email,
        },
      });
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

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = tokenCreate(user._id);
      res.cookie('jwt', token, newCookieOptions);
      res.send({ data: { _id: user._id, name: user.name, email: user.email } });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    const token = tokenCreate(req.user._id, 0);
    res.cookie('jwt', token, oldCookieOptions);
    res.send({ data: LOGOUT_SUCC });
  } catch (err) {
    next(err);
  }
};
