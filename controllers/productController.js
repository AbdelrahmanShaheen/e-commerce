const Product = require("../models/product");
const factory = require("./handlersFactory");

const setProductIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

//@desc Get a specific product
//@route GET /api/v1/products/:id
//@access Public
const getProduct = factory.getOne(Product);

//@desc Create product
//@route POST /api/v1/products
//@access Private
const createProduct = factory.createOne(Product);

//@desc Get list of products
//@route GET /api/v1/products
//@access Public
const getProducts = factory.getAll(Product, "Product");

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
