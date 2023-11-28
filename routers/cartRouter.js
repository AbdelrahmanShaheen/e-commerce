const express = require("express");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../controllers/cartController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");
const cartRouter = express.Router();
cartRouter.use(auth, allowedTo("user"));
cartRouter.put("/applyCoupon", applyCoupon);
cartRouter
  .route("/")
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);
cartRouter
  .route("/:id")
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

module.exports = cartRouter;
