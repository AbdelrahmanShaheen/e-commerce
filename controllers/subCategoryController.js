const Category = require("../models/category");
const ObjectID = require("mongoose").Types.ObjectId;
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const SubCategory = require("../models/subCategory");

//@desc Create subCategory
//@route POST /api/v1/subCategories
//@access Private
const createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  if (!ObjectID.isValid(category))
    return next(
      new AppError("Category with that invalid id does not exist!", 400)
    );
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
  const subCategories = await SubCategory.find({}, null, options);
  res.status(200).send({ results: subCategories.length, data: subCategories });
});

//@desc Get a specific subCategory
//@route GET /api/v1/subCategories/:id
//@access Public
const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id))
    return next(
      new AppError("subCategory with that invalid id does not exist!", 400)
    );
  const subCategory = await SubCategory.findById(id);
  if (!subCategory)
    return next(new AppError("subCategory with this id is not found", 404));
  res.status(200).send({ data: subCategory });
});

//@desc Update category
//@route PUT /api/v1/categories/:id
//@access Private
const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id))
    return next(
      new AppError("subCategory with that invalid id does not exist!", 400)
    );
  const subCategory = await SubCategory.findById(id);
  if (!subCategory)
    return next(new AppError("subCategory with this id is not found", 404));
  //handle error when updating by field that does not exist in the subCategory
  const allowedUpdates = ["name", "category"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) return next(new AppError("invalid updates!", 400));
  updates.forEach((update) => {
    subCategory[update] = req.body[update];
  });
  if (updates.includes("name")) subCategory["slug"] = slugify(req.body["name"]);
  subCategory.save();
  res.status(200).send({ data: subCategory });
});
module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
};
