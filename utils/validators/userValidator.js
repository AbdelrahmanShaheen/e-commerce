const { check } = require("express-validator");

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
    .withMessage("Password must be at least 6 characters"),
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

module.exports = { userIdValidator, createUserValidator, updateUserValidator };
