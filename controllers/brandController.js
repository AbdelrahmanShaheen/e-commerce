const Brand = require("../models/brand");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");
const setBrandIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  next();
};

//@desc Get a specific brand
//@route GET /api/v1/brands/:id
//@access Public
const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
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
  const apiFeatures = new ApiFeatures(Brand.find(), req.query);
  const countDocuments = await Brand.countDocuments();
  apiFeatures.filter().paginate(countDocuments).limitFields().search().sort();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;
  res
    .status(200)
    .send({ results: brands.length, paginationResult, data: brands });
});
//@desc Update brand
//@route PUT /api/v1/brands/:id
//@access Private
const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const { name } = req.body;
  const brand = await Brand.findById(id);
  if (!brand) return next(new AppError("Brand with this id is not found", 404));
  //check if there is a brand with this name is exists.....
  const duplicateBrand = await Brand.findOne({ name });
  if (duplicateBrand)
    return next(new AppError("Duplicate! brand with this name exists!", 400));
  //...........................................................
  brand["name"] = name;
  brand["slug"] = slugify(name);
  brand.save();
  res.status(200).send({ data: brand });
});
//@desc Delete brand
//@route POST /api/v1/brands/:id
//@access Private
const deleteBrand = factory.deleteOne(Brand);
module.exports = {
  getBrand,
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  setBrandIdToBody,
};
