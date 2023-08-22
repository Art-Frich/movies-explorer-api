const { USER_EXIST_TEXT, USER_EXIST_STATUS } = require('../helpers/constants');

class UserAlreadyExistError extends Error {
  constructor() {
    super(USER_EXIST_TEXT);
    this.status = USER_EXIST_STATUS;
  }
}

module.exports = UserAlreadyExistError;
