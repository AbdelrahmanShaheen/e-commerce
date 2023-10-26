const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const factory = require("./handlersFactory");
const Brand = require("../models/brand");

const setBrandIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

// Upload single image
const uploadCategoryImage = uploadSingleImage("image");

const resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/brands/${filename}`);
    //save image name into DB.
    req.body.image = filename;
  }
  next();
});

//@desc Get a specific brand
//@route GET /api/v1/brands/:id
//@access Public
const getBrand = factory.getOne(Brand);

//@desc Create brand
//@route POST /api/v1/brands
//@access Private/[Admin-Manager]
const createBrand = factory.createOne(Brand);

//@desc Get list of brands
//@route GET /api/v1/brands
//@access Public
const getBrands = factory.getAll(Brand);

//@desc Update brand
//@route PUT /api/v1/brands/:id
//@access Private/[Admin-Manager]
const allowedUpdates = ["name", "image"];
const updateBrand = factory.updateOne(Brand, allowedUpdates);

//@desc Delete brand
//@route POST /api/v1/brands/:id
//@access Private/Admin
const deleteBrand = factory.deleteOne(Brand);
module.exports = {
  getBrand,
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  setBrandIdToBody,
  uploadCategoryImage,
  resizeImage,
};
