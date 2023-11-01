const express = require("express");
const { productIdValidator } = require("../utils/validators/wishlistValidator");

const {
  addProductToWishlist,
  removeProductFromWishlist,
  setProductIdToBody,
  getLoggedUserWishlist,
} = require("../controllers/wishlistController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");

const wishlistRouter = express.Router();
wishlistRouter.use(auth, allowedTo("user"));
wishlistRouter
  .route("/")
  .post(productIdValidator, addProductToWishlist)
  .get(getLoggedUserWishlist);
wishlistRouter
  .route("/:productId")
  .delete(setProductIdToBody, productIdValidator, removeProductFromWishlist);
module.exports = wishlistRouter;
