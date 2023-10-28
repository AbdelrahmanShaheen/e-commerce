const express = require("express");

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
  .post(auth, allowedTo("user"), createReview)
  .get(getReviews);
reviewRouter
  .route("/:id")
  .get(setReviewIdToBody, getReview)
  .put(auth, allowedTo("user"), setReviewIdToBody, updateReview)
  .delete(
    auth,
    allowedTo("admin", "manager", "user"),
    setReviewIdToBody,
    deleteReview
  );
module.exports = reviewRouter;
