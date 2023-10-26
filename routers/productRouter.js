const express = require("express");

const {
  updateProductValidator,
  productIdValidator,
  createProductValidator,
} = require("../utils/validators/productValidator");

const {
  getProduct,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  setProductIdToBody,
  uploadProductImage,
  resizeImage,
} = require("../controllers/productController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");

const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    auth,
    allowedTo("admin", "manager"),
    uploadProductImage,
    resizeImage,
    createProductValidator,
    createProduct
  )
  .get(getProducts);
productRouter
  .route("/:id")
  .get(setProductIdToBody, productIdValidator, getProduct)
  .put(
    auth,
    allowedTo("admin", "manager"),
    uploadProductImage,
    resizeImage,
    setProductIdToBody,
    updateProductValidator,
    updateProduct
  )
  .delete(
    auth,
    allowedTo("admin"),
    setProductIdToBody,
    productIdValidator,
    deleteProduct
  );
module.exports = productRouter;
