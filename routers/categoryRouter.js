const express = require("express");
const {
  getCategory,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController.js");
const subCategoryRouter = require("./subCategoryRouter.js");
const app = express();
const categoryRouter = express.Router();
//for nested routes :
categoryRouter.use("/:categoryId/subCategories", subCategoryRouter);

categoryRouter.route("/").post(createCategory).get(getCategories);
categoryRouter
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);
module.exports = categoryRouter;
