const { check } = require("express-validator");
const Category = require("../../models/category");
const SubCategory = require("../../models/subCategory");
const Product = require("../../models/product");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const belongsToCategory = async (subcategoriesIds, req) => {
  const product = await Product.findById(req.body.id);
  const subcategories = await SubCategory.find({
    category: product.category,
  });

  const subcategoriesIdsInDB = subcategories.map((subCategory) =>
    String(subCategory._id)
  );
  const validSubCategoriesIds = subcategoriesIds.every((subCategoryId) =>
    subcategoriesIdsInDB.includes(subCategoryId)
  );
  if (!validSubCategoriesIds)
    throw new Error("At least one subcategory does not belong to the category");
};
const existsInDB = async (subcategoriesIds) => {
  const subcategories = await SubCategory.find({
    _id: { $in: subcategoriesIds, $exists: true },
  });
  if (subcategories.length !== subcategoriesIds.length)
    throw new Error(`At least one subCategory does not exist in the DB`);
};

const updateProductValidator = [
  check("id")
    .isMongoId()
    .withMessage("product with that invalid id does not exist!"),
  check("title")
    .optional()
    .notEmpty()
    .withMessage("A product must have a name")
    .isLength({ min: 3 })
    .withMessage("A product name must have at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("A product name must have at most 32 characters"),
  check("description")
    .optional()
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 20 })
    .withMessage("Too short product description")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .optional()
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .optional()
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((priceAfterDiscount, { req }) => {
      if (req.body.price <= priceAfterDiscount) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("imageCover")
    .optional()
    .notEmpty()
    .withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .optional()
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) throw new Error(`No category for this id: ${categoryId}`);
      return true;
    }),
  check("subcategories")
    .optional()
    .isArray()
    .withMessage("subcategories should be array of MongoID")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (subcategoriesIds) => {
      await existsInDB(subcategoriesIds);
    })
    .custom(async (subcategoriesIds, { req }) => {
      await belongsToCategory(subcategoriesIds, req);
    }),
  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),

  validatorMiddleware,
];

const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("A product must have a name")
    .isLength({ min: 3 })
    .withMessage("A product name must have at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("A product name must have at most 32 characters"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 20 })
    .withMessage("Too short product description")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((priceAfterDiscount, { req }) => {
      if (req.body.price <= priceAfterDiscount) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) throw new Error(`No category for this id: ${categoryId}`);
      return true;
    }),
  check("subcategories")
    .optional()
    .isArray()
    .withMessage("subcategories should be array of MongoID")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (subcategoriesIds) => {
      await existsInDB(subcategoriesIds);
    })
    .custom(async (subcategoriesIds, { req }) => {
      await belongsToCategory(subcategoriesIds, req);
    }),
  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),
  validatorMiddleware,
];

const productIdValidator = [
  check("id")
    .isMongoId()
    .withMessage("Product with that invalid id does not exist!"),
  validatorMiddleware,
];

module.exports = {
  updateProductValidator,
  productIdValidator,
  createProductValidator,
};
