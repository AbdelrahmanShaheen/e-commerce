const express = require("express");
const {
  getCategory,
  createCategory,
  getCategories,
} = require("../controllers/categoryController.js");
const app = express();
const categoryRouter = express.Router();
categoryRouter.route("/").post(createCategory).get(getCategories);
module.exports = categoryRouter;
