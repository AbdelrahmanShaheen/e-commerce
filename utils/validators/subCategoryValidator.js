const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const updateSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("A subCategory must have a name")
    .isLength({ min: 2 })
    .withMessage("A subCategory name must have at least 2 characters")
    .isLength({ max: 32 })
    .withMessage("A subCategory name must have at most 32 characters"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Category with that invalid id does not exist!"),
  check("id")
    .isMongoId()
    .withMessage("subCategory with that invalid id does not exist!"),
  validatorMiddleware,
];
const categoryIdValidator = [
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Category with that invalid id does not exist!"),
  validatorMiddleware,
];

const subCategoryIdValidator = [
  check("id")
    .isMongoId()
    .withMessage("subCategory with that invalid id does not exist!"),
  validatorMiddleware,
];
module.exports = {
  updateSubCategoryValidator,
  categoryIdValidator,
  subCategoryIdValidator,
};
