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
const setImgUrl = (doc) => {
  if (doc.image) {
    const imgUrl = process.env.BASE_URL + "/categories/" + doc.image;
    doc.image = imgUrl;
  }
};
//After create/save query
BrandSchema.post("save", function (doc) {
  setImgUrl(doc);
});
//After getOne ,getAll ,update--> find query
BrandSchema.post("init", function (doc) {
  setImgUrl(doc);
});
const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
