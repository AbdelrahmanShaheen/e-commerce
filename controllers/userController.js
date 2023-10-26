const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const slugify = require("slugify");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const factory = require("./handlersFactory");
const AppError = require("../utils/AppError");
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
//@access Private/Admin
const getUser = factory.getOne(User);

//@desc Create user
//@route POST /api/v1/users
//@access Private/Admin
const createUser = factory.createOne(User);

//@desc Get list of users
//@route GET /api/v1/users
//@access Private/[Admin-Manager]
const getUsers = factory.getAll(User);

//@desc Update user
//@route PUT /api/v1/users/:id
//@access Private/Admin
const allowedUpdates = [
  "name",
  "profileImg",
  "email",
  "phone",
  "role",
  "active",
];
const updateUser = factory.updateOne(User, allowedUpdates);

//@desc Update user password
//@route PUT /api/v1/users/changePassword/:id
//@access Private/Admin
const changeUserPassword = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  delete req.body.id;
  delete req.body.passConfirmation;
  delete req.body.password;

  //handle error when updating by field that does not exist in the document
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    ["newPassword"].includes(update)
  );
  if (!isValidOperation) return next(new AppError("invalid updates!", 400));

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      password: await bcrypt.hash(req.body.newPassword, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  res.status(200).send({ data: user });
});

//@desc Delete user
//@route DELETE /api/v1/users/:id
//@access Private/Admin
const deleteUser = factory.deleteOne(User);

// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Auth
const getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.body.id = req.user._id;
  next();
});

// @desc    Update logged user password
// @route   PUT /api/v1/users/changeMyPassword
// @access  Private/Auth
const changeLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const { user } = req;
  user.password = req.body.password;
  user.passwordChangedAt = Date.now();
  await user.save();
  res.status(200).send({ data: user, token: user.generateAuthToken() });
});

// @desc    Update logged user data (without password, role)
// @route   PUT /api/v1/users/updateMe
// @access  Private/Auth
const updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const allowedUpdates = ["name", "email", "phone"];
  //handle error when updating by field that does not exist in the user
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) return next(new AppError("invalid updates!", 400));

  req.body["slug"] = slugify(req.body.name);
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    req.body,
    {
      new: true,
    }
  );

  res.status(200).send({ data: updatedUser });
});

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Auth
const deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  const { user } = req;
  user.active = false;
  await user.save();
  res.status(204).send({ status: "success" });
});

module.exports = {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  changeUserPassword,
  setUserIdToBody,
  uploadUserImage,
  resizeImage,
  getLoggedUserData,
  changeLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
};
