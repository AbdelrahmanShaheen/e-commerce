const express = require("express");

const {
  getCoupon,
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");
const couponRouter = express.Router();
couponRouter.use(auth, allowedTo("admin", "manager"));
couponRouter.route("/").post(createCoupon).get(getCoupons);
couponRouter
  .route("/:id")
  .get(getCoupon)
  .put(updateCoupon)
  .delete(deleteCoupon);
module.exports = couponRouter;
