const { check } = require("express-validator");
const Product = require("../../models/product");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const productIdValidator = [
  check("product")
    .isMongoId()
    .withMessage("Invalid product id format!")
    .custom(async (productId) => {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error(`There is no product with id: ${productId}`);
      }
      return true;
    }),
  validatorMiddleware,
];
module.exports = { productIdValidator };
