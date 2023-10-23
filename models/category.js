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
const setImgUrl = (doc) => {
  if (doc.image) {
    const imgUrl = process.env.BASE_URL + "/categories/" + doc.image;
    doc.image = imgUrl;
  }
};
//After create/save query
CategorySchema.post("save", function (doc) {
  setImgUrl(doc);
});
//After getOne ,getAll ,update--> find query
CategorySchema.post("init", function (doc) {
  setImgUrl(doc);
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
