const factory = require("./handlersFactory");
const Coupon = require("../models/coupon");
const setCouponIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};
//@desc Get a specific coupon
//@route GET /api/v1/coupons/:id
//@access Private/[Admin-Manager]
const getCoupon = factory.getOne(Coupon);

//@desc Create coupon
//@route POST /api/v1/coupons
//@access Private/[Admin-Manager]
const createCoupon = factory.createOne(Coupon);

//@desc Get list of coupons
//@route GET /api/v1/coupons
//@access Private/[Admin-Manager]
const getCoupons = factory.getAll(Coupon);

//@desc Update coupon
//@route PUT /api/v1/coupons/:id
//@access Private/[Admin-Manager]
const allowedUpdates = ["name", "expire", "discount"];
const updateCoupon = factory.updateOne(Coupon, allowedUpdates);

//@desc Delete coupon
//@route POST /api/v1/coupons/:id
//@access Private/[Admin-Manager]
const deleteCoupon = factory.deleteOne(Coupon);
module.exports = {
  getCoupon,
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  setCouponIdToBody,
};
