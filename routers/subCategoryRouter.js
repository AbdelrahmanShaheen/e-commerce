const express = require("express");
const {
  createSubCategory,
  getSubCategories,
} = require("../controllers/subCategoryController");

const app = express();
const subCategoryRouter = express.Router();
subCategoryRouter.route("/").post(createSubCategory).get(getSubCategories);
module.exports = subCategoryRouter;
