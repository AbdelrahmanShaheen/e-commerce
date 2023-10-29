const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    ratings: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to product"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to user"],
    },
  },
  { timestamps: true }
);
reviewSchema.pre(["find", "findOne"], function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
