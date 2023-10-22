const Brand = require("../models/brand");
const factory = require("./handlersFactory");

const setBrandIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

//@desc Get a specific brand
//@route GET /api/v1/brands/:id
//@access Public
const getBrand = factory.getOne(Brand);

//@desc Create brand
//@route POST /api/v1/brands
//@access Private
const createBrand = factory.createOne(Brand);

//@desc Get list of brands
//@route GET /api/v1/brands
//@access Public
const getBrands = factory.getAll(Brand);

//@desc Update brand
//@route PUT /api/v1/brands/:id
//@access Private
const allowedUpdates = ["name"];
const updateBrand = factory.updateOne(Brand, allowedUpdates);

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
