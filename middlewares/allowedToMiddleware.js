const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
//@desc Authorization(User Permission)
const allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    const { user } = req;
    if (!roles.includes(user.role)) {
      return next(
        new AppError("You are not allowed to access this route", 403)
      );
    }
    next();
  });

module.exports = allowedTo;
