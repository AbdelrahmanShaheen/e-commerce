const express = require("express");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
} = require("../controllers/cartController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");
const cartRouter = express.Router();
cartRouter.use(auth, allowedTo("user"));
cartRouter.route("/").post(addProductToCart).get(getLoggedUserCart);
cartRouter
  .route("/:id")
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem)
  .delete(clearCart);
module.exports = cartRouter;
