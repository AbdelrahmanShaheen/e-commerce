const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const updateSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("A category must have a name")
    .isLength({ min: 2 })
    .withMessage("A category name must have at least 2 characters")
    .isLength({ max: 32 })
    .withMessage("A category name must have at most 32 characters"),
  validatorMiddleware,
];

module.exports = updateSubCategoryValidator;
