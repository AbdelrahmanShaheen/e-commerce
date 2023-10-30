const express = require("express");
const {
  createReviewValidator,
  updateReviewValidator,
  reviewIdValidator,
  deleteReviewValidator,
  productIdValidator,
} = require("../utils/validators/reviewValidator");
const {
  getReview,
  createReview,
  getReviews,
  updateReview,
  deleteReview,
  setReviewIdToBody,
  setProductIdToBody,
  setFilterObjToBody,
} = require("../controllers/reviewController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");
const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route("/")
  .post(auth, allowedTo("user"), createReviewValidator, createReview)
  .get(setFilterObjToBody, productIdValidator, getReviews);
reviewRouter
  .route("/:id")
  .get(
    setProductIdToBody,
    productIdValidator,
    setReviewIdToBody,
    reviewIdValidator,
    getReview
  )
  .put(
    auth,
    allowedTo("user"),
    setReviewIdToBody,
    updateReviewValidator,
    updateReview
  )
  .delete(
    auth,
    allowedTo("admin", "manager", "user"),
    setReviewIdToBody,
    deleteReviewValidator,
    deleteReview
  );
module.exports = reviewRouter;
