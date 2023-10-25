const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

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
//@access Public
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
};
