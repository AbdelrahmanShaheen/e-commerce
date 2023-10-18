const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const updateCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("A category must have a name")
    .isLength({ min: 3 })
    .withMessage("A category name must have at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("A category name must have at most 32 characters"),
  validatorMiddleware,
];

module.exports = updateCategoryValidator;
