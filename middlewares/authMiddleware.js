const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const User = require("../models/user");
//@desc make sure that user is logged in.
const auth = asyncHandler(async (req, res, next) => {
  //1) check if token exists
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.replace("Bearer ", "");
  }
  if (!token) {
    return next(
      new AppError(
        "You are not login, Please login to get access this route",
        401
      )
    );
  }
  //2) verify token (no change happens & expired token)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { _id, iat } = decodedToken;
  //3) check if user exists
  const user = await User.findById(_id);
  if (!user)
    return next(
      new AppError("The user belongs to this token does no longer exists", 401)
    );
  //4) check if user change his password after token created
  if (user.passwordChangedAt) {
    const passChangedTimestamp = parseInt(user.passwordChangedAt / 1000, 10);
    if (passChangedTimestamp > iat) {
      return next(
        new AppError(
          "User recently changed his password. please login again..",
          401
        )
      );
    }
  }
  // check if the user active or not
  if (!user.active) {
    return next(new AppError("User is not active", 401));
  }
  req.user = user;
  next();
});

module.exports = auth;
