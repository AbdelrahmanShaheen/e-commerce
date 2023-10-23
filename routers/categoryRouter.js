const express = require("express");

const {
  updateCategoryValidator,
  categoryIdValidator,
} = require("../utils/validators/categoryValidator");
const {
  getCategory,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  setCategoryIdToBody,
  uploadCategoryImage,
  resizeImage,
} = require("../controllers/categoryController.js");
const subCategoryRouter = require("./subCategoryRouter.js");

const categoryRouter = express.Router();
//for nested routes :
categoryRouter.use("/:categoryId/subCategories", subCategoryRouter);

categoryRouter
  .route("/")
  .post(uploadCategoryImage, resizeImage, createCategory)
  .get(getCategories);
categoryRouter
  .route("/:id")
  .get(setCategoryIdToBody, categoryIdValidator, getCategory)
  .put(
    uploadCategoryImage,
    resizeImage,
    setCategoryIdToBody,
    updateCategoryValidator,
    updateCategory
  )
  .delete(setCategoryIdToBody, categoryIdValidator, deleteCategory);
module.exports = categoryRouter;
