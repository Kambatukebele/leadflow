class AppError extends Error {
  errorCode: number;
  statusCode: number;
  constructor(errorCode: number, message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.errorCode = errorCode;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default AppError;
