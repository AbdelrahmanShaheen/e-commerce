const express = require("express");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const { signup, login } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.route("/signup").post(signupValidator, signup);
authRouter.route("/login").post(loginValidator, login);

module.exports = authRouter;
