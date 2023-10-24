const express = require("express");
const {
  signupValidator,
  // loginValidator,
} = require("../utils/validators/authValidator");

const { signup } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.route("/signup").post(signupValidator, signup);

module.exports = authRouter;
