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
  uploadBrandImage,
  resizeImage,
} = require("../controllers/brandController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");
const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(
    auth,
    allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImage,
    createBrand
  )
  .get(getBrands);
brandRouter
  .route("/:id")
  .get(setBrandIdToBody, brandIdValidator, getBrand)
  .put(
    auth,
    allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImage,
    setBrandIdToBody,
    updateBrandValidator,
    updateBrand
  )
  .delete(
    auth,
    allowedTo("admin"),
    setBrandIdToBody,
    brandIdValidator,
    deleteBrand
  );
module.exports = brandRouter;
