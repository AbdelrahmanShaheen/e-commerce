const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const slugify = require("slugify");

const AppError = require("../utils/AppError");
const User = require("../models/user");
//@desc signup
//@route Post /api/v1/auth/signup
//@access Public
const signup = asyncHandler(async (req, res, next) => {
  const { name, password, email } = req.body;
  const user = await User.create({
    name,
    slug: slugify(name),
    password,
    email,
  });
  const token = user.generateAuthToken();
  res.status(201).send({ data: user, token });
});
//@desc login
//@route Post /api/v1/auth/login
//@access Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!user || !isMatch)
    return next(new AppError("Incorrect email or password", 401));
  const token = user.generateAuthToken();
  res.status(200).send({ data: user, token });
});

module.exports = { signup, login };
