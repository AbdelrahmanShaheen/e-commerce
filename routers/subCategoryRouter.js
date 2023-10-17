const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
} = require("../controllers/subCategoryController");

const app = express();
const subCategoryRouter = express.Router();
subCategoryRouter.route("/").post(createSubCategory).get(getSubCategories);
subCategoryRouter.route("/:id").get(getSubCategory).put(updateSubCategory);
module.exports = subCategoryRouter;
