const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "A category must have a name"],
      minLength: [3, "A category name must have at least 3 characters"],
      maxLength: [32, "A category name must have at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
