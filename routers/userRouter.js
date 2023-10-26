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
userRouter.use(auth);
//Logged user
userRouter.get("/getMe", getLoggedUserData, getUser);
userRouter.put("/changeMyPassword", changeLoggedUserPassword);
userRouter.put("/UpdateMe", updateLoggedUserValidator, updateLoggedUserData);
//Admin
userRouter.put(
  "/changePassword/:id",
  allowedTo("admin"),
  setUserIdToBody,
  changeUserPasswordValidator,
  changeUserPassword
);
userRouter
  .route("/")
  .post(
    allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser
  )
  .get(allowedTo("admin", "manager"), getUsers);
userRouter
  .route("/:id")
  .get(allowedTo("admin"), setUserIdToBody, userIdValidator, getUser)
  .put(
    allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    setUserIdToBody,
    updateUserValidator,
    updateUser
  )
  .delete(allowedTo("admin"), setUserIdToBody, userIdValidator, deleteUser);
module.exports = userRouter;
