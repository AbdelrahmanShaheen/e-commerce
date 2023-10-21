const Category = require("../models/category");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const SubCategory = require("../models/subCategory");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

const setCategoryIdToBody = (req, res, next) => {
  req.body.category = req.params.categoryId;
  delete req.params.categoryId;
  next();
};

const setSubCategoryIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

const setFilterObjToBody = (req, res, next) => {
  const { categoryId } = req.params;
  const filterObj = {};
  if (categoryId) {
    req.body.category = categoryId;
    filterObj.category = categoryId;
  }
  req.body.filterObj = filterObj;
  delete req.params.categoryId;
  next();
};
//@desc Create subCategory
//@route POST /api/v1/subCategories
//@access Private
const createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const categoryObj = await Category.findById(category);
  if (!categoryObj)
    return next(new AppError("Category with this id is not found", 404));
  let slug;
  if (name) slug = slugify(name);
  const newSubCategory = new SubCategory({
    name,
    slug,
    category,
  });
  await newSubCategory.save();
  res.status(201).send({ data: newSubCategory });
});

//@desc Get list of subCategories
//@route GET /api/v1/subCategories
//@access Public
const getSubCategories = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(SubCategory.find(), req.query);
  const countDocuments = await SubCategory.countDocuments();
  apiFeatures.filter().paginate(countDocuments).limitFields().search().sort();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const subCategories = await mongooseQuery.populate({
    path: "category",
    select: "name -_id",
  });
  res.status(200).send({
    results: subCategories.length,
    paginationResult,
    data: subCategories,
  });
});

//@desc Get a specific subCategory
//@route GET /api/v1/subCategories/:id
//@access Public
const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory)
    return next(new AppError("subCategory with this id is not found", 404));
  res.status(200).send({ data: subCategory });
});

//@desc Update category
//@route PUT /api/v1/categories/:id
//@access Private
const allowedUpdates = ["name", "category"];
const updateSubCategory = factory.updateOne(SubCategory, allowedUpdates);

//@desc Delete category
//@route POST /api/v1/categories/:id
//@access Private
const deleteSubCategory = factory.deleteOne(SubCategory);

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  setFilterObjToBody,
  setSubCategoryIdToBody,
};
