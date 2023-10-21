const Product = require("../models/product");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

const setProductIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

//@desc Get a specific product
//@route GET /api/v1/products/:id
//@access Public
const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product)
    return next(new AppError("Product with this id is not found", 404));
  res.status(200).send({ data: product });
});
//@desc Create product
//@route POST /api/v1/products
//@access Private
const createProduct = factory.createOne(Product);
//@desc Get list of products
//@route GET /api/v1/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(Product.find(), req.query);
  const countDocuments = await Product.countDocuments();
  apiFeatures
    .filter()
    .limitFields()
    .search("Product")
    .sort()
    .paginate(countDocuments);
  const { paginationResult, mongooseQuery } = apiFeatures;
  const products = await mongooseQuery.populate({
    path: "category",
    select: "name -_id",
  });

  res
    .status(200)
    .send({ results: products.length, paginationResult, data: products });
});
//@desc Update product
//@route PUT /api/v1/products/:id
//@access Private
const allowedUpdates = [
  "title",
  "description",
  "quantity",
  "sold",
  "price",
  "priceAfterDiscount",
  "colors",
  "imageCover",
  "images",
  "category",
  "subcategories",
  "brand",
  "ratingsAverage",
  "ratingsQuantity",
];
const updateProduct = factory.updateOne(Product, allowedUpdates);
//@desc Delete product
//@route POST /api/v1/products/:id
//@access Private
const deleteProduct = factory.deleteOne(Product);

module.exports = {
  getProduct,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  setProductIdToBody,
};
