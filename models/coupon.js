const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "A Coupon must have a name"],
    },
    expire: {
      type: Date,
      require: [true, "Coupon's expire date is required"],
    },
    discount: {
      type: Number,
      require: [true, "Coupon's discount value is required"],
    },
  },
  { timestamps: true }
);
const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
