import StatusCodes from "../StatusCodes";

class ServerError {
  message: string;
  statusCode: StatusCodes;

  constructor(message: string, statusCode: StatusCodes) {
    this.message = message;
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default ServerError;
