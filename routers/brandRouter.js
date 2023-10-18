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
} = require("../controllers/brandController");

const app = express();
const brandRouter = express.Router();

brandRouter.route("/").post(createBrand).get(getBrands);
brandRouter
  .route("/:id")
  .get(setBrandIdToBody, brandIdValidator, getBrand)
  .put(setBrandIdToBody, updateBrandValidator, updateBrand)
  .delete(setBrandIdToBody, brandIdValidator, deleteBrand);
module.exports = brandRouter;
