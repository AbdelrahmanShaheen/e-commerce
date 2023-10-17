const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
} = require("../controllers/subCategoryController");

const app = express();
const subCategoryRouter = express.Router();
subCategoryRouter.route("/").post(createSubCategory).get(getSubCategories);
subCategoryRouter.route("/:id").get(getSubCategory);
module.exports = subCategoryRouter;
