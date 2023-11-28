const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const Cart = require("../models/cart");
const Product = require("../models/product");

const calcTotalCartPrice = (cart) => {
  let totalCartPrice = 0;
  cart.cartItems.forEach((item) => {
    totalCartPrice += item.price * item.quantity;
  });
  cart.totalCartPrice = totalCartPrice;
};
//@desc add product to cart
//@route POST /api/v1/cart
//@access Private/user

const addProductToCart = asyncHandler(async (req, res, next) => {
  //3 cases : 1- no cart , 2- cart found(2.1- same cartItem with same color ,2.2- same cartItem with diff color)
  const { product, color } = req.body;
  let cart = await Cart.findOne({ user: req.user });
  const productObj = await Product.findById(product);
  //if user has no shopping cart create one with the item
  if (!cart) {
    const cartItems = [{ product, color, price: productObj.price }];
    cart = new Cart({ cartItems, user: req.user._id });
  }
  //if user has a shopping cart check :
  else {
    let itemIndex;
    cart.cartItems.forEach((item, index) => {
      if (item.product.toString() === product && item.color === color)
        itemIndex = index;
    });
    //if its the same product item with the same color
    if (itemIndex > -1) {
      cart.cartItems[itemIndex].quantity += 1;
    }
    //or its a diff product item
    else {
      cart.cartItems.push({ product, color, price: productObj.price });
    }
  }
  calcTotalCartPrice(cart);
  await cart.save();
  res.status(201).send({ status: "success", data: cart });
});

//@desc Get logged user shopping cart
//@route GET /api/v1/cart
//@access Private/user

const getLoggedUserCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user });
  if (!cart) return next(new AppError("There is no cart for this user", 404));
  res.status(200).send({
    status: "success",
    data: cart,
    numOfCartItems: cart.cartItems.length,
  });
});

//@desc Remove specific cart item
//@route DELETE /api/v1/cart/:id
//@access Private/user

const removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  let cart = await Cart.findOneAndUpdate(
    { user: _id },
    {
      $pull: { cartItems: { _id: req.params.id } },
    },
    { new: true }
  );
  if (!cart) return next(new AppError("There is no cart for this user", 404));
  calcTotalCartPrice(cart);
  await cart.save();
  res.status(200).send({
    status: "success",
    data: cart,
    numOfCartItems: cart.cartItems.length,
  });
});

//@desc Clear logged user cart
//@route DELETE /api/v1/cart/:id
//@access Private/user

const clearCart = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  await Cart.findOneAndDelete({ user: id });
  res.status(204).send();
});

//@desc update specific cart item quantity
//@route PUT /api/v1/cart/:id
//@access Private/user

const updateCartItemQuantity = asyncHandler(async (req, res, next) => {});

module.exports = {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
};
