const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const factory = require("./handlersFactory");
const Category = require("../models/category");

const setCategoryIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};
// Upload single image
const uploadCategoryImage = uploadSingleImage("image");

const resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${filename}`);
    //save image name into DB.
    req.body.image = filename;
  }
  next();
});

//@desc Get a specific category
//@route GET /api/v1/categories/:id
//@access Public
const getCategory = factory.getOne(Category);

//@desc Create category
//@route POST /api/v1/categories
//@access Private/[Admin-Manager]
const createCategory = factory.createOne(Category);

//@desc Get list of categories
//@route GET /api/v1/categories
//@access Public
const getCategories = factory.getAll(Category);

//@desc Update category
//@route PUT /api/v1/categories/:id
//@access Private/[Admin-Manager]
const allowedUpdates = ["name", "image"];
const updateCategory = factory.updateOne(Category, allowedUpdates);

//@desc Delete category
//@route POST /api/v1/categories/:id
//@access Private/Admin
const deleteCategory = factory.deleteOne(Category);
module.exports = {
  getCategory,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  setCategoryIdToBody,
  uploadCategoryImage,
  resizeImage,
};
