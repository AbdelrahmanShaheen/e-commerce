const express = require("express");
const {
  userIdValidator,
  createUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
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
  changeLoggedUserPassword,
  updateLoggedUserData,
} = require("../controllers/userController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");

const userRouter = express.Router();
//Logged user
userRouter.route("/getMe").get(auth, getLoggedUserData, getUser);
userRouter.route("/changeMyPassword").put(auth, changeLoggedUserPassword);
userRouter
  .route("/UpdateMe")
  .put(auth, updateLoggedUserValidator, updateLoggedUserData);
//Admin
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
