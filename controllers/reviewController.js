const factory = require("./handlersFactory");
const Review = require("../models/review");

const setReviewIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};

//@desc Get a specific review
//@route GET /api/v1/reviews/:id
//@access Public
const getReview = factory.getOne(Review);

//@desc Create review
//@route POST /api/v1/reviews
//@access Private/Auth/user
const createReview = factory.createOne(Review);

//@desc Get list of reviews
//@route GET /api/v1/reviews
//@access Public
const getReviews = factory.getAll(Review);

//@desc Update review
//@route PUT /api/v1/reviews/:id
//@access Private/Auth/user
const allowedUpdates = ["title", "ratings"];
const updateReview = factory.updateOne(Review, allowedUpdates);

//@desc Delete review
//@route POST /api/v1/reviews/:id
//@access Private/Auth/[user-admin-manager]
const deleteReview = factory.deleteOne(Review);
module.exports = {
  getReview,
  createReview,
  getReviews,
  updateReview,
  deleteReview,
  setReviewIdToBody,
};
