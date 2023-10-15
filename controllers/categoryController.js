const Category = require("../models/category");
const slugify = require("slugify");
const getCategory = (req, res) => {
  res.send();
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

module.exports = { getCategory, createCategory, getCategories };
