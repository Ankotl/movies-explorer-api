const { ERROR_CODE_NOT_FOUND } = require('../constans');

class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_NOT_FOUND;
  }
}

module.exports = ErrorNotFound;
