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
  getLoggedUserData,
} = require("../controllers/userController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");

const userRouter = express.Router();
userRouter.route("/getMe").get(auth, getLoggedUserData, getUser);
userRouter.put(
  "/changePassword/:id",
  setUserIdToBody,
  changeUserPasswordValidator,
  changeUserPassword
);
userRouter
  .route("/")
  .post(
    auth,
    allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser
  )
  .get(auth, allowedTo("admin", "manager"), getUsers);
userRouter
  .route("/:id")
  .get(auth, allowedTo("admin"), setUserIdToBody, userIdValidator, getUser)
  .put(
    auth,
    allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    setUserIdToBody,
    updateUserValidator,
    updateUser
  )
  .delete(
    auth,
    allowedTo("admin"),
    setUserIdToBody,
    userIdValidator,
    deleteUser
  );
module.exports = userRouter;
