/**
 * Class to provide uniform instance/formatting for HTTP error responses
 * @module HttpError
 */
class HttpError extends Error {
  /**
   * @constructor
   * @param {number} status - HTTP status code
   * @param {number} code - Application specific error code
   *  9999 for generic system error
   * @param {string} message - Error description
   */
  constructor(
      status = 500,
      code = 9999,
      message = 'System Error') {
    super();
    this.timestamp = new Date();
    this.status = status;
    this.code = code;
    this.message = message;
  }
}

module.exports = HttpError;
