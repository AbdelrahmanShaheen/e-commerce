const { check } = require("express-validator");
const bcrypt = require("bcrypt");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/user");
const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("Too short name"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("E-mail already in user");
    }),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passConfirmation)
        throw new Error("Password Confirmation incorrect");
      return true;
    }),
  check("passConfirmation")
    .notEmpty()
    .withMessage("Password confirmation is required"),
  validatorMiddleware,
];
const updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format!"),
  check("name").optional().isLength({ min: 3 }).withMessage("Too short name"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("E-mail already in user");
      return true;
    }),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),
  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validatorMiddleware,
];
const userIdValidator = [
  check("id").isMongoId().withMessage("Invalid user id format!"),
  validatorMiddleware,
];
const changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid user id format!"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .custom(async (password, { req }) => {
      const user = await User.findOne({ _id: req.body.id });
      if (!user) throw new Error("user with this id is not found");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Password is incorrect");
      return true;
    }),
  check("newPassword").notEmpty().withMessage("New password is required"),
  check("passConfirmation")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((passConfirmation, { req }) => {
      if (passConfirmation !== req.body.newPassword)
        throw new Error("Password confirmation is incorrect");
      return true;
    }),
  validatorMiddleware,
];
const updateLoggedUserValidator = [
  check("name").optional().isLength({ min: 3 }).withMessage("Too short name"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("E-mail already in user");
      return true;
    }),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),
  validatorMiddleware,
];
module.exports = {
  userIdValidator,
  createUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
};
