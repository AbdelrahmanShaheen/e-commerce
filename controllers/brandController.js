const Brand = require("../models/brand");
const ObjectID = require("mongoose").Types.ObjectId;
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

//@desc Get a specific brand
//@route GET /api/v1/brands/:id
//@access Public
const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id))
    return next(
      new AppError("Brand with that invalid id does not exist!", 400)
    );
  const brand = await Brand.findById(id);
  if (!brand) return next(new AppError("Brand with this id is not found", 404));
  res.status(200).send({ data: brand });
});
//@desc Create brand
//@route POST /api/v1/brands
//@access Private
const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  let slug;
  if (name) slug = slugify(name);
  const newBrand = new Brand({ name, slug });
  await newBrand.save();
  res.status(201).send({ data: newBrand });
});
//@desc Get list of brands
//@route GET /api/v1/brands
//@access Public
const getBrands = asyncHandler(async (req, res) => {
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
  const brands = await Brand.find({}, null, options);
  res.status(200).send({ results: brands.length, data: brands });
});
//@desc Update brand
//@route PUT /api/v1/brands/:id
//@access Private
const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id))
    return next(
      new AppError("Brand with that invalid id does not exist!", 400)
    );
  const { name } = req.body;
  const brand = await Brand.findById(id);
  if (!brand) return next(new AppError("Brand with this id is not found", 404));
  //check if there is a brand with this name is exists.....
  const duplicateBrand = await Brand.findOne({name});
  if(duplicateBrand)
    return next(
      new AppError("Duplicate! brand with this name exists!", 400)
    );
  //...........................................................
  brand["name"] = name;
  brand["slug"] = slugify(name);
  brand.save();
  res.status(200).send({ data: brand });
});
//@desc Delete brand
//@route POST /api/v1/brands/:id
//@access Private
const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id))
    return next(
      new AppError("Brand with that invalid id does not exist!", 400)
    );
  const brand = await Brand.findByIdAndRemove(id);
  if (!brand)
    return next(new AppError("Category with this id is not found", 404));
  res.status(204).send();
});
module.exports = {
  getBrand,
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
