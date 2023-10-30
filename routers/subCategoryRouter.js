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

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");

const subCategoryRouter = express.Router({ mergeParams: true });
subCategoryRouter
  .route("/")
  .post(
    auth,
    allowedTo("admin", "manager"),
    setCategoryIdToBody,
    categoryIdValidator,
    createSubCategory
  )
  .get(setFilterObjToBody, categoryIdValidator, getSubCategories);
subCategoryRouter
  .route("/:id")
  .get(setSubCategoryIdToBody, subCategoryIdValidator, getSubCategory)
  .put(
    auth,
    allowedTo("admin", "manager"),
    setSubCategoryIdToBody,
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    auth,
    allowedTo("admin"),
    setSubCategoryIdToBody,
    subCategoryIdValidator,
    deleteSubCategory
  );
module.exports = subCategoryRouter;
