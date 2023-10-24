const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const factory = require("./handlersFactory");
const User = require("../models/user");

const setUserIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

// Upload single image
const uploadUserImage = uploadSingleImage("profileImg");

const resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);
    //save image name into DB.
    req.body.profileImg = filename;
  }
  next();
});

//@desc Get a specific user
//@route GET /api/v1/users/:id
//@access Private
const getUser = factory.getOne(User);

//@desc Create user
//@route POST /api/v1/users
//@access Private
const createUser = factory.createOne(User);

//@desc Get list of users
//@route GET /api/v1/users
//@access Private
const getUsers = factory.getAll(User);

//@desc Update user
//@route PUT /api/v1/users/:id
//@access Private
const allowedUpdates = [
  "name",
  "profileImg",
  "email",
  "phone",
  "password",
  "role",
  "active",
];
const updateUser = factory.updateOne(User, allowedUpdates);

//@desc Delete user
//@route DELETE /api/v1/users/:id
//@access Private
const deleteUser = factory.deleteOne(User);
module.exports = {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  setUserIdToBody,
  uploadUserImage,
  resizeImage,
};
