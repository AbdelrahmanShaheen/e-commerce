const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/user");
const Product = require("../../models/product");
const Review = require("../../models/review");
const updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (id, { req }) => {
      const review = await Review.findOne({ _id: id });
      if (!review) throw new Error(`There is no review with this id: ${id}`);
      if (String(review.user) !== String(req.user._id))
        throw new Error("You are not allowed to perform this action");
      return true;
    }),
  check("title").optional(),
  check("ratings")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1.0 to 5.0"),
  validatorMiddleware,
];

const reviewIdValidator = [
  check("id")
    .isMongoId()
    .withMessage("Review with that invalid id does not exist!"),
  validatorMiddleware,
];
const createReviewValidator = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("ratings value is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1.0 to 5.0"),
  check("user")
    .notEmpty()
    .withMessage("Review must belong to user")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (userId) => {
      const user = await User.findOne({ _id: userId });
      if (!user) throw new Error(`No user for this id: ${userId}`);
      return true;
    }),
  check("product")
    .notEmpty()
    .withMessage("Review must belong to product")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (productId, { req }) => {
      const product = await Product.findOne({ _id: productId });
      if (!product) throw new Error(`No product for this id: ${productId}`);
      const review = await Review.findOne({
        user: req.body.user,
        product: req.body.product,
      });
      if (review) throw new Error("You already created a review before");
      return true;
    }),
  validatorMiddleware,
];
const deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (id, { req }) => {
      const review = await Review.findOne({ _id: id });
      if (!review) throw new Error(`There is no review with this id: ${id}`);
      if (req.user.role === "user") {
        if (String(review.user) !== String(req.user._id))
          throw new Error("You are not allowed to perform this action");
      }
      return true;
    }),
  validatorMiddleware,
];
module.exports = {
  createReviewValidator,
  updateReviewValidator,
  reviewIdValidator,
  deleteReviewValidator,
};
