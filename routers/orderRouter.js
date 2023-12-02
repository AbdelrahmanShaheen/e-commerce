const express = require("express");

const { createCashOrder } = require("../controllers/orderController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");
const orderRouter = express.Router();
orderRouter.use(auth, allowedTo("user"));

orderRouter.route("/:cartId").post(createCashOrder);

module.exports = orderRouter;
