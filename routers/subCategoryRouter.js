const express = require("express");
const {
  updateSubCategoryValidator,
  categoryIdValidator,
  subCategoryIdValidator,
} = require("../utils/validators/subCategoryValidator");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  setFilterObjToBody,
  setSubCategoryIdToBody,
} = require("../controllers/subCategoryController");

const app = express();
const subCategoryRouter = express.Router({ mergeParams: true });
subCategoryRouter
  .route("/")
  .post(setCategoryIdToBody, categoryIdValidator, createSubCategory)
  .get(setFilterObjToBody, categoryIdValidator, getSubCategories);
subCategoryRouter
  .route("/:id")
  .get(setSubCategoryIdToBody, subCategoryIdValidator, getSubCategory)
  .put(setSubCategoryIdToBody, updateSubCategoryValidator, updateSubCategory)
  .delete(setSubCategoryIdToBody, subCategoryIdValidator, deleteSubCategory);
module.exports = subCategoryRouter;
