const express = require("express");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.route("/signup").post(signupValidator, signup);
authRouter.route("/login").post(loginValidator, login);
authRouter.route("/forgotPassword").post(forgotPassword);
authRouter.route("/verifyResetCode").post(verifyPassResetCode);
authRouter.route("/resetPassword").put(resetPassword);

module.exports = authRouter;
