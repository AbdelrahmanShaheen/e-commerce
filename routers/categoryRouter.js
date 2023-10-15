const express = require("express");
const {
  getCategory,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController.js");
const app = express();
const categoryRouter = express.Router();
categoryRouter.route("/").post(createCategory).get(getCategories);
categoryRouter
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);
module.exports = categoryRouter;
