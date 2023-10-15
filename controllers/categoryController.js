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
module.exports = { getCategory, createCategory };
