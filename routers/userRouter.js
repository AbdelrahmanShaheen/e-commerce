const express = require("express");
// const {
//   updateBrandValidator,
//   brandIdValidator,
// } = require("../utils/validators/brandValidator");

const {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  setUserIdToBody,
  uploadUserImage,
  resizeImage,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter
  .route("/")
  .post(uploadUserImage, resizeImage, createUser)
  .get(getUsers);
userRouter
  .route("/:id")
  .get(setUserIdToBody, getUser)
  .put(uploadUserImage, resizeImage, setUserIdToBody, updateUser)
  .delete(setUserIdToBody, deleteUser);
module.exports = userRouter;
