const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

const app = express();
const subCategoryRouter = express.Router({ mergeParams: true });
subCategoryRouter.route("/").post(createSubCategory).get(getSubCategories);
subCategoryRouter
  .route("/:id")
  .get(getSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);
module.exports = subCategoryRouter;
