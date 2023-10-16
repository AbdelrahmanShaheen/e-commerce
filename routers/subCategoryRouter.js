const express = require("express");
const { createSubCategory } = require("../controllers/subCategoryController");

const app = express();
const subCategoryRouter = express.Router();
subCategoryRouter.route("/").post(createSubCategory);
module.exports = subCategoryRouter;
