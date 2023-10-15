const Category = require("../models/category");
const ObjectID = require("mongoose").Types.ObjectId;
const slugify = require("slugify");
const getCategory = async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id))
    return res
      .status(406)
      .send({ message: "Category with that invalid id does not exist!" });
  try {
    const category = await Category.findById(id);
    if (!category)
      res.status(404).send({ message: "Category with this id is not found" });
    res.status(200).send(category);
  } catch (err) {
    res.status(500).send();
  }
};
const createCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name, slug: slugify(name) });
  try {
    await newCategory.save();
    res.status(201).send({ data: newCategory });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
const getCategories = async (req, res) => {
  try {
    const options = {};
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skip = (page - 1) * limit;
      options.skip = skip;
      options.limit = limit;
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      options.sort = {
        [parts[0]]: parts[1] === "desc" ? -1 : 1,
      };
    }
    const categories = await Category.find({}, null, options);
    if (categories.length === 0) {
      return res.status(404).send({ error: "No categories found" });
    }
    res.status(200).send({ results: categories.length, data: categories });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { getCategory, createCategory, getCategories, getCategory };
