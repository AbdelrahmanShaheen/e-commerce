const Category = require("../models/category");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");
const setCategoryIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

//@desc Get a specific category
//@route GET /api/v1/categories/:id
//@access Public
const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

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
  const apiFeatures = new ApiFeatures(Category.find(), req.query);
  const countDocuments = await Category.countDocuments();
  apiFeatures.filter().paginate(countDocuments).limitFields().search().sort();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;
  res
    .status(200)
    .send({ results: categories.length, paginationResult, data: categories });
});
//@desc Update category
//@route PUT /api/v1/categories/:id
//@access Private
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const { name } = req.body;
  const category = await Category.findById(id);
  if (!category)
    return next(new AppError("Category with this id is not found", 404));
  //check if there is a category with this name is exists.....
  const duplicateCategory = await Category.findOne({ name });
  if (duplicateCategory)
    return next(
      new AppError("Duplicate! category with this name exists!", 400)
    );
  //...........................................................
  category["name"] = name;
  category["slug"] = slugify(name);
  category.save();
  res.status(200).send({ data: category });
});
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
