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
module.exports = { createSubCategory };
