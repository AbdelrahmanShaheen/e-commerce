const Product = require("../models/product");
const SubCategory = require("../models/subCategory");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

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
const createProduct = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (title) req.body.slug = slugify(title);

  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).send({ data: newProduct });
});
//@desc Get list of products
//@route GET /api/v1/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
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
  const products = await Product.find({}, null, options).populate({
    path: "category",
    select: "name -_id",
  });
  res.status(200).send({ results: products.length, data: products });
});
//@desc Update product
//@route PUT /api/v1/products/:id
//@access Private
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const product = await Product.findById(id);
  if (!product)
    return next(new AppError("Product with this id is not found", 404));
  //handle error when updating by field that does not exist in the product
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
  delete req.body.id;
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) return next(new AppError("invalid updates!", 400));
  //...........................................................
  //Validate that all the subcategories belong to the category
  const subcategories = await SubCategory.find({
    category: product.category,
  });

  const subcategoriesIdsInDB = subcategories.map((subCategory) =>
    String(subCategory._id)
  );
  const subcategoriesIds = product.subcategories;
  const validSubCategoriesIds = subcategoriesIds.every((subCategoryId) =>
    subcategoriesIdsInDB.includes(subCategoryId)
  );
  if (!validSubCategoriesIds)
    throw new Error("At least one subcategory does not belong to the category");
  //..................................................
  updates.forEach((update) => {
    product[update] = req.body[update];
  });
  if (req.body.title) product["slug"] = slugify(title);
  product.save();
  res.status(200).send({ data: product });
});
//@desc Delete product
//@route POST /api/v1/products/:id
//@access Private
const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const product = await Product.findByIdAndRemove(id);
  if (!product)
    return next(new AppError("Product with this id is not found", 404));
  res.status(204).send();
});
module.exports = {
  getProduct,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  setProductIdToBody,
};
