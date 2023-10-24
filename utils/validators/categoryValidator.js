const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/category");
const updateCategoryValidator = [
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("A category name must have at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("A category name must have at most 32 characters")
    .custom(async (name) => {
      //check if there is a document with this name is exists.....
      const category = await Category.findOne({ name });
      if (category)
        throw new Error("Duplicate! category with this name exists!");
      return true;
    }),
  check("id")
    .isMongoId()
    .withMessage("Category with that invalid id does not exist!"),
  validatorMiddleware,
];
const categoryIdValidator = [
  check("id")
    .isMongoId()
    .withMessage("Category with that invalid id does not exist!"),
  validatorMiddleware,
];

module.exports = { updateCategoryValidator, categoryIdValidator };
