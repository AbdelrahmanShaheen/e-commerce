const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const setAddressIdToBody = (req, res, next) => {
  req.body.addressId = req.params.addressId;
  delete req.params.addressId;
  next();
};
//@desc Add address to user addresses list
//@route POST /api/v1/addresses
//@access Private/user
const addAddress = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  res.status(201).send({
    message: "Address added successfully.",
    data: user.addresses,
  });
});
//@desc remove address from user addresses list
//@route DELETE /api/v1/addresses/:addressId
//@access Private/user
const removeAddress = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const addressId = req.body.addressId;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { addresses: { _id: addressId } },
    },
    { new: true }
  );
  res.status(200).send({
    message: "Address removed successfully.",
    data: user.addresses,
  });
});

//@desc get logged user addresses
//@route GET /api/v1/addresses
//@access Private/user
const getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });
  res.status(200).send({
    status: "success",
    results: user.addresses.length,
    data: user.addresses,
  });
});
module.exports = {
  addAddress,
  removeAddress,
  setAddressIdToBody,
  getLoggedUserAddresses,
};
