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

const productRouter = express.Router();

productRouter
  .route("/")
  .post(uploadProductImage, resizeImage, createProductValidator, createProduct)
  .get(getProducts);
productRouter
  .route("/:id")
  .get(setProductIdToBody, productIdValidator, getProduct)
  .put(
    uploadProductImage,
    resizeImage,
    setProductIdToBody,
    updateProductValidator,
    updateProduct
  )
  .delete(setProductIdToBody, productIdValidator, deleteProduct);
module.exports = productRouter;
