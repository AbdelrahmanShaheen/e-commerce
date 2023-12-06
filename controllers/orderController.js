const stripe = require("stripe")(process.env.STRIPE_SECRET);
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const factory = require("./handlersFactory");

const User = require("../models/user");
const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

const setOrderIdToBody = (req, res, next) => {
  req.body.id = req.params.orderId;
  delete req.params.orderId;
  next();
};
const filterOrderForLoggedUser = (req, res, next) => {
  if (req.user.role === "user") {
    req.body.filterObj = { user: req.user._id };
  }
  next();
};
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

//@desc find all orders
//@route POST /api/v1/orders
//@access Private/[admin-manager]
const findAllOrders = factory.getAll(Order);

//@desc find specific order
//@route POST /api/v1/orders/orderId
//@access Public/[user-admin-manager]
const findOrder = factory.getOne(Order);

//@desc update order to paid
//@route PUT /api/v1/orders/:orderId/pay
//@access Private/[admin-manager]
const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order)
    next(new AppError(`There is no order with this id: ${orderId}`, 404));
  order.isPaid = true;
  order.paidAt = Date.now();
  await order.save();
  res.status(200).send({ message: "success", data: order });
});

//@desc update order to delivered
//@route PUT /api/v1/orders/:orderId/deliver
//@access Private/[admin-manager]
const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order)
    next(new AppError(`There is no order with this id: ${orderId}`, 404));
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).send({ message: "success", data: order });
});

// @desc    Get checkout session from stripe and send it as response
// @route   GET /api/v1/orders/checkout-session/cartId
// @access  Protected/User
const checkoutSession = asyncHandler(async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new AppError(`There is no such cart with id ${req.params.cartId}`, 404)
    );
  }

  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });

  // 4) send session to response
  res.status(200).json({ status: "success", session });
});
const createCardOrder = async (session) => {
  const cartId = session.client_reference_id;
  const shippingAddress = session.metadata;
  const oderPrice = session.amount_total / 100;

  const cart = await Cart.findById(cartId);
  const user = await User.findOne({ email: session.customer_email });

  // 3) Create order with default paymentMethodType card
  const order = await Order.create({
    user: user._id,
    cartItems: cart.cartItems,
    shippingAddress,
    totalOrderPrice: oderPrice,
    isPaid: true,
    paidAt: Date.now(),
    paymentMethodType: "card",
  });

  // 4) After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartId
    await Cart.findByIdAndDelete(cartId);
  }
};

// @desc    This webhook will run when stripe payment success paid
// @route   POST /webhook-checkout
// @access  Protected/User
const webhookCheckout = asyncHandler(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === "checkout.session.completed") {
    //  Create order
    createCardOrder(event.data.object);
  }

  res.status(200).json({ received: true });
});

module.exports = {
  createCashOrder,
  checkoutSession,
  webhookCheckout,
  findAllOrders,
  findOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  setOrderIdToBody,
  filterOrderForLoggedUser,
};
