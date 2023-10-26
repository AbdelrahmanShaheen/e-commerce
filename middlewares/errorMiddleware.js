const AppError = require("../utils/AppError");

const handleDuplicateFieldsDB = (error) => {
  return new AppError(
    `Duplicate field value: "${error.keyValue.name}". please use another value!`,
    400
  );
};
const handleValidationErrorDB = (error) => {
  return new AppError(`${error.message}`, 400);
};
const handleJwtExpired = () => {
  return new AppError("Expired token, please login again..", 401);
};
const handleJwtInvalidSignature = () => {
  return new AppError("Invalid token, please login again..", 401);
};
const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).send({
    message: err.message,
    err: err,
    status: err.status,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client.
  if (err.isOperational) {
    res.status(err.statusCode).send({
      message: err.message,
      status: err.status,
    });
    //Programming or other unknown error: do not leak error details.
  } else {
    console.error("ERROR ", err);
    return res.status(500).send({
      message: "something went wrong!",
      status: "error",
    });
  }
};
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message };
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error?.errors?.name?.name === "ValidatorError")
      error = handleValidationErrorDB(error.errors.name);
    if (error.name === "TokenExpiredError") error = handleJwtExpired();
    if (error.name === "JsonWebTokenError") error = handleJwtInvalidSignature();
    sendErrorProd(error, res);
  }
};
module.exports = globalErrorHandler;
