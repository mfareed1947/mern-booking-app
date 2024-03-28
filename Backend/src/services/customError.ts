class CustomErrorHandler {
  status: number;
  message: string;

  constructor(status: number, msg: string) {
    this.status = status;
    this.message = msg;
  }

  static alreadyExist(message: string) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message: string = "Wrong password!") {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message: string = "unAuthorized") {
    return new CustomErrorHandler(401, message);
  }

  static tokenExpired(message: string = "Token is expired") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message: string = "404 Not Found") {
    return new CustomErrorHandler(404, message);
  }

  static serverError(message: string = "Internal server error") {
    return new CustomErrorHandler(500, message);
  }

  static customError(status: number, message: string) {
    return new CustomErrorHandler(status, message);
  }
}

export default CustomErrorHandler;
