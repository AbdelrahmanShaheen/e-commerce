const { check } = require("express-validator");

const Category = require("../../models/category");
const SubCategory = require("../../models/subCategory");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const updateSubCategoryValidator = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("A subCategory name must have at least 2 characters")
    .isLength({ max: 32 })
    .withMessage("A subCategory name must have at most 32 characters")
    .custom(async (name) => {
      //check if there is a document with this name is exists.....
      const subCategory = await SubCategory.findOne({ name });
      if (subCategory)
        throw new Error("Duplicate! subCategory with this name exists!");
    }),
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
