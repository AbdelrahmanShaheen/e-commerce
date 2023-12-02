const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

//@desc create cash order
//@route POST /api/v1/orders/cartId
//@access Private/user

const createCashOrder = asyncHandler(async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;
  //1- Get cart depend on cartId
  const cartId = req.params.cartId;
  const cart = await Cart.findById(cartId);
  if (!cart) next(new AppError(`There is no cart for this id:${cartId}`, 404));

  const cartItems = cart.cartItems;
  //2- Get order price depend on cart price "Check if coupon apply"
  const orderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;
  const totalOrderPrice = orderPrice + taxPrice + shippingPrice;
  //3- Create order with default paymentMethodType cash
  const order = await Order.create({
    shippingAddress: req.body.shippingAddress,
    user: req.user._id,
    totalOrderPrice,
    cartItems,
  });
  //4- After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOption, {});
    //5- Clear cart depend on cartId
    await Cart.findByIdAndRemove(cartId);
  }

  res.status(201).send({ message: "success", data: order });
});

module.exports = { createCashOrder };
