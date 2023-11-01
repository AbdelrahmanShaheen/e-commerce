const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const setProductIdToBody = (req, res, next) => {
  req.body.product = req.params.productId;
  delete req.params.productId;
  next();
};
//@desc Add product to wishlist
//@route POST /api/v1/wishlists
//@access Private/user
const addProductToWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.body.product;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { wishlists: productId },
    },
    { new: true }
  );
  res.status(201).send({
    message: "Product added successfully to your wishlist.",
    data: user.wishlists,
  });
});
//@desc remove product from wishlist
//@route DELETE /api/v1/wishlists/:productId
//@access Private/user
const removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.body.product;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { wishlists: productId },
    },
    { new: true }
  );
  res.status(200).send({
    message: "Product removed successfully from your wishlist.",
    data: user.wishlists,
  });
});

//@desc get logged user wishlist
//@route GET /api/v1/wishlists
//@access Private/user
const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id }).populate({
    path: "wishlists",
    select: "title price priceAfterDiscount ratingsAverage",
  });
  res.status(200).send({
    status: "success",
    results: user.wishlists.length,
    data: user.wishlists,
  });
});
module.exports = {
  addProductToWishlist,
  removeProductFromWishlist,
  setProductIdToBody,
  getLoggedUserWishlist,
};
