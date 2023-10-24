const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const slugify = require("slugify");

const AppError = require("../utils/AppError");
const User = require("../models/user");

const signup = asyncHandler(async (req, res, next) => {
  const { name, password, email } = req.body;
  const user = await User.create({
    name,
    slug: slugify(name),
    password: await bcrypt.hash(password, 12),
    email,
  });
  const token = await user.generateAuthToken();
  res.status(201).send({ data: user, token });
});

module.exports = { signup };
