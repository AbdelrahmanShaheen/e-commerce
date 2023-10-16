const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "A subCategory must have a name"],
      minLength: [2, "A subCategory name must have at least 2 characters"],
      maxLength: [32, "A subCategory name must have at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "subCategory must belong to parent category"],
    },
  },
  { timestamps: true }
);
const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
