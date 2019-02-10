require('app-module-path').addPath(require('app-root-path').toString());

const httpError = require('api/responses/HttpError');

/**
 * Class to provide uniformed instance/formatting
 *  for "not found" error responses
 */
class NotFoundError extends httpError {
  /**
  * @constructor
  * @param {string}message - custom error message
  */
  constructor(message = 'Not found') {
    super(404, 9997, message);
  }
}

module.exports = NotFoundError;
