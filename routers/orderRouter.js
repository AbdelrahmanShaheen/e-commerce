const express = require("express");

const {
  createCashOrder,
  findAllOrders,
  findOrder,
  setOrderIdToBody,
  filterOrderForLoggedUser,
} = require("../controllers/orderController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");
const orderRouter = express.Router();
orderRouter.use(auth);

orderRouter.route("/:cartId").post(allowedTo("user"), createCashOrder);
orderRouter
  .route("/")
  .get(
    allowedTo("user", "admin", "manager"),
    filterOrderForLoggedUser,
    findAllOrders
  );
orderRouter.get("/:orderId", setOrderIdToBody, findOrder);
module.exports = orderRouter;
