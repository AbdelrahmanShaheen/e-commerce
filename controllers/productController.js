const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");
const Product = require("../models/product");

const setProductIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

const uploadProductImage = uploadMixOfImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

const resizeImage = asyncHandler(async (req, res, next) => {
  const imageCover = req.files.imageCover[0];
  const images = req.files.images;
  if (imageCover) {
    const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(imageCover.buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${filename}`);
    //save imageCover name into DB.
    req.body.imageCover = filename;
  }
  if (images) {
    const imgs = [];
    await Promise.all(
      images.map(async (img, index) => {
        const filename = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${filename}`);
        //save images name into DB.
        imgs.push(filename);
      })
    );
    req.body.images = imgs;
  }
  next();
});
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
  uploadProductImage,
  resizeImage,
};
