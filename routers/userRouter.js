const express = require("express");
const {
  userIdValidator,
  createUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");

const {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  changeUserPassword,
  setUserIdToBody,
  uploadUserImage,
  resizeImage,
} = require("../controllers/userController");

const userRouter = express.Router();
userRouter.put(
  "/changePassword/:id",
  setUserIdToBody,
  changeUserPasswordValidator,
  changeUserPassword
);
userRouter
  .route("/")
  .post(uploadUserImage, resizeImage, createUserValidator, createUser)
  .get(getUsers);
userRouter
  .route("/:id")
  .get(setUserIdToBody, userIdValidator, getUser)
  .put(
    uploadUserImage,
    resizeImage,
    setUserIdToBody,
    updateUserValidator,
    updateUser
  )
  .delete(setUserIdToBody, userIdValidator, deleteUser);
module.exports = userRouter;
