const express = require("express");
const {
  getBrand,
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const app = express();
const brandRouter = express.Router();

brandRouter.route("/").post(createBrand).get(getBrands);
brandRouter.route("/:id").get(getBrand).put(updateBrand).delete(deleteBrand);
module.exports = brandRouter;
