const express = require("express");
const {
  createReviewValidator,
  updateReviewValidator,
  reviewIdValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidator");
const {
  getReview,
  createReview,
  getReviews,
  updateReview,
  deleteReview,
  setReviewIdToBody,
} = require("../controllers/reviewController");

const auth = require("../middlewares/authMiddleware");
const allowedTo = require("../middlewares/allowedToMiddleware");
const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .post(auth, allowedTo("user"), createReviewValidator, createReview)
  .get(getReviews);
reviewRouter
  .route("/:id")
  .get(setReviewIdToBody, reviewIdValidator, getReview)
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
