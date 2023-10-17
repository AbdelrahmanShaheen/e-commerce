const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "A brand must have a name"],
      minLength: [3, "A brand name must have at least 3 characters"],
      maxLength: [32, "A brand name must have at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
