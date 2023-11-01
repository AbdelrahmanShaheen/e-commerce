const express = require("express");
const { addressIdValidator } = require("../utils/validators/addressValidator");

const {
  addAddress,
  removeAddress,
  setAddressIdToBody,
  getLoggedUserAddresses,
} = require("../controllers/addressController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");

const addressRouter = express.Router();
addressRouter.use(auth, allowedTo("user"));
addressRouter.route("/").post(addAddress).get(getLoggedUserAddresses);
addressRouter
  .route("/:addressId")
  .delete(setAddressIdToBody, addressIdValidator, removeAddress);
module.exports = addressRouter;
