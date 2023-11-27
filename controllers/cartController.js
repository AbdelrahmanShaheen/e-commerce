const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const Cart = require("../models/cart");

//@desc add product to cart
//@route POST /api/v1/cart
//@access Private/user

const addProductToCart = asyncHandler(async (req, res, next) => {
  //3 cases : 1- no cart , 2- cart found(2.1- same cartItem with same color ,2.2- same cartItem with diff color)
});

//@desc Get logged user shopping cart
//@route GET /api/v1/cart/:id
//@access Private/user

const getLoggedUserCart = asyncHandler(async (req, res, next) => {});

//@desc Remove specific cart item
//@route DELETE /api/v1/cart/:id
//@access Private/user

const removeSpecificCartItem = asyncHandler(async (req, res, next) => {});

//@desc Clear logged user cart
//@route DELETE /api/v1/cart/:id
//@access Private/user

const clearCart = asyncHandler(async (req, res, next) => {});

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
