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
// wishlistRouter.use(auth);
//Logged user
wishlistRouter
  .route("/")
  .post(auth, allowedTo("user"), productIdValidator, addProductToWishlist)
  .get(auth, allowedTo("user"), getLoggedUserWishlist);
wishlistRouter
  .route("/:productId")
  .delete(
    auth,
    allowedTo("user"),
    setProductIdToBody,
    productIdValidator,
    removeProductFromWishlist
  );
module.exports = wishlistRouter;
