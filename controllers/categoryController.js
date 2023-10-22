const Category = require("../models/category");
const factory = require("./handlersFactory");

const setCategoryIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

//@desc Get a specific category
//@route GET /api/v1/categories/:id
//@access Public
const getCategory = factory.getOne(Category);

//@desc Create category
//@route POST /api/v1/categories
//@access Private
const createCategory = factory.createOne(Category);

//@desc Get list of categories
//@route GET /api/v1/categories
//@access Public
const getCategories = factory.getAll(Category);

//@desc Update category
//@route PUT /api/v1/categories/:id
//@access Private
const allowedUpdates = ["name"];
const updateCategory = factory.updateOne(Category, allowedUpdates);

//@desc Delete category
//@route POST /api/v1/categories/:id
//@access Private
const deleteCategory = factory.deleteOne(Category);
module.exports = {
  getCategory,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  setCategoryIdToBody,
};
