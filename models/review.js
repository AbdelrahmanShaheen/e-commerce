const mongoose = require("mongoose");
const Product = require("./product");
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
reviewSchema.statics.calcAvgRatingsAndQuantity = async function (productId) {
  const results = await this.aggregate([
    //Stage 1: Get all reviews in specific product
    { $match: { product: productId } },
    //Stage 2: Grouping reviews based on productId and calc avgRatings & ratingsQuantity
    {
      $group: {
        _id: productId,
        avgRatings: { $avg: "$ratings" },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);
  if (results.length) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: results[0].avgRatings,
      ratingsQuantity: results[0].ratingsQuantity,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};
reviewSchema.post("save", async function (doc) {
  await this.constructor.calcAvgRatingsAndQuantity(doc.product);
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
