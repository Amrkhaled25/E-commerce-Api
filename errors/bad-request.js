const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./api-error");
class BadRequest extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequest;
