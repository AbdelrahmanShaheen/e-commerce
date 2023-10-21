const { check } = require("express-validator");
const Category = require("../../models/category");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const updateSubCategoryValidator = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("A subCategory name must have at least 2 characters")
    .isLength({ max: 32 })
    .withMessage("A subCategory name must have at most 32 characters"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Category with that invalid id does not exist!")
    .custom(async (categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) throw new Error(`No category for this id: ${categoryId}`);
    }),
  check("id")
    .isMongoId()
    .withMessage("subCategory with that invalid id does not exist!"),
  validatorMiddleware,
];
const categoryIdValidator = [
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Category with that invalid id does not exist!")
    .custom(async (categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) throw new Error("Category with this id is not found");
    }),
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
