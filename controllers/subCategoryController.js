const Category = require("../models/category");
const ObjectID = require("mongoose").Types.ObjectId;
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const SubCategory = require("../models/subCategory");

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
  const options = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  options.skip = skip;
  options.limit = limit;
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    options.sort = {
      [parts[0]]: parts[1] === "desc" ? -1 : 1,
    };
  }
  const subCategories = await SubCategory.find(
    req.body.filterObj,
    null,
    options
  );
  res.status(200).send({ results: subCategories.length, data: subCategories });
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
const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id, name, category } = req.body;
  const subCategory = await SubCategory.findById(id);

  if (!subCategory)
    return next(new AppError("subCategory with this id is not found", 404));
  //handle error when updating by field that does not exist in the subCategory
  const allowedUpdates = ["name", "category"];
  delete req.body.id;
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) return next(new AppError("invalid updates!", 400));
  //if categoryId entered to be changed
  if (category) {
    const categoryObj = await Category.findById(category);
    if (!categoryObj)
      return next(new AppError("Category with this id is not found", 404));
    else subCategory["category"] = category;
  }
  //if name entered to be changed
  if (name) {
    const duplicateSubCategory = await SubCategory.findOne({ name });
    //check if there is a subCategory with this name is exists.....
    if (duplicateSubCategory)
      return next(
        new AppError("Duplicate! subCategory with this name exists!", 400)
      );
    else {
      subCategory["name"] = name;
      subCategory["slug"] = slugify(name);
    }
  }
  subCategory.save();
  res.status(200).send({ data: subCategory });
});

//@desc Delete category
//@route POST /api/v1/categories/:id
//@access Private
const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const subCategory = await SubCategory.findByIdAndRemove(id);
  if (!subCategory)
    return next(new AppError("subCategory with this id is not found", 404));
  res.status(204).send();
});
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
