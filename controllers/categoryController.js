const Category = require("../models/category");
const ObjectID = require("mongoose").Types.ObjectId;
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

//@desc Get a specific category
//@route GET /api/v1/categories/:id
//@access Public
const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id))
    return next(
      new AppError("Category with that invalid id does not exist!", 400)
    );
  const category = await Category.findById(id);
  if (!category)
    return next(new AppError("Category with this id is not found", 404));
  res.status(200).send({ data: category });
});
//@desc Create category
//@route POST /api/v1/categories
//@access Private
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  let slug;
  if (name) slug = slugify(name);
  const newCategory = new Category({ name, slug });
  await newCategory.save();
  res.status(201).send({ data: newCategory });
});
//@desc Get list of categories
//@route GET /api/v1/categories
//@access Public
const getCategories = asyncHandler(async (req, res) => {
  const options = {};
  if (req.query.page && req.query.limit) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    options.skip = skip;
    options.limit = limit;
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    options.sort = {
      [parts[0]]: parts[1] === "desc" ? -1 : 1,
    };
  }
  const categories = await Category.find({}, null, options);
  res.status(200).send({ results: categories.length, data: categories });
});
//@desc Update category
//@route PUT /api/v1/categories/:id
//@access Private
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id))
    return next(
      new AppError("Category with that invalid id does not exist!", 400)
    );
  const { name } = req.body;
  const category = await Category.findById(id);
  if (!category)
    return next(new AppError("Category with this id is not found", 404));
  category["name"] = name;
  category["slug"] = slugify(name);
  category.save();
  res.status(200).send({ data: category });
});
//@desc Delete category
//@route POST /api/v1/categories/:id
//@access Private
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id))
    return next(
      new AppError("Category with that invalid id does not exist!", 400)
    );
  const category = await Category.findByIdAndRemove(id);
  console.log(category);
  if (!category)
    return next(new AppError("Category with this id is not found", 404));
  res.status(204).send();
});
module.exports = {
  getCategory,
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
