const express = require("express");
const {
  getCategory,
  createCategory,
} = require("../controllers/categoryController.js");
const app = express();
const categoryRouter = express.Router();
categoryRouter.route("/").post(createCategory).get(getCategory);
module.exports = categoryRouter;
