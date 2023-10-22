const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const Category = require("../models/category");
const factory = require("./handlersFactory");
const AppError = require("../utils/AppError");

const setCategoryIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

//file upload config
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Only images allowed", 400), false);
  }
};
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.originalname.split(".")[1];
//     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });
const storage = multer.memoryStorage();

const upload = multer({ storage, fileFilter });

// Upload single image
const uploadCategoryImage = upload.single("image");

const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);
  //save image name into DB.
  req.body.image = filename;
  next();
});

//@desc Get a specific category
//@route GET /api/v1/categories/:id
//@access Public
const getCategory = factory.getOne(Category);

//@desc Create category
//@route POST /api/v1/categories
//@access Private
const createCategory = factory.createOne(Category);

//@desc Get list of categories
//@route GET /api/v1/categories
//@access Public
const getCategories = factory.getAll(Category);

//@desc Update category
//@route PUT /api/v1/categories/:id
//@access Private
const allowedUpdates = ["name", "image"];
const updateCategory = factory.updateOne(Category, allowedUpdates);

//@desc Delete category
//@route POST /api/v1/categories/:id
//@access Private
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
