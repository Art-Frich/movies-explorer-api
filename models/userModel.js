const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
  regExpEmail, EXPECTED_EMAIL_TEXT, minLen, maxLen, UNCORRECT_AUTH_TEXT,
} = require('../helpers/constants');
const AuthError = require('../castomErrors/AuthError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => regExpEmail.test(value),
      message: EXPECTED_EMAIL_TEXT,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: minLen,
    maxLength: maxLen,
    default: 'Your name',
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this
    .findOne({ email })
    .select('+password')
    .then((user) => {
      const err = new AuthError(UNCORRECT_AUTH_TEXT);

      try {
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) throw err;
            return user;
          });
      } catch (_) {
        throw err;
      }
    });
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
