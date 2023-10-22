const express = require("express");
const {
  updateBrandValidator,
  brandIdValidator,
} = require("../utils/validators/brandValidator");

const {
  getBrand,
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  setBrandIdToBody,
  uploadCategoryImage,
  resizeImage,
} = require("../controllers/brandController");

const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(uploadCategoryImage, resizeImage, createBrand)
  .get(getBrands);
brandRouter
  .route("/:id")
  .get(setBrandIdToBody, brandIdValidator, getBrand)
  .put(
    uploadCategoryImage,
    resizeImage,
    setBrandIdToBody,
    updateBrandValidator,
    updateBrand
  )
  .delete(setBrandIdToBody, brandIdValidator, deleteBrand);
module.exports = brandRouter;
