const SubCategory = require("../models/subCategory");
const factory = require("./handlersFactory");
//used for nested route (create)
const setCategoryIdToBody = (req, res, next) => {
  req.body.category = req.params.categoryId;
  delete req.params.categoryId;
  next();
};

const setSubCategoryIdToBody = (req, res, next) => {
  req.body.id = req.params.id;
  delete req.params.id;
  next();
};
//used for nested route (get)
const setFilterObjToBody = (req, res, next) => {
  const { categoryId } = req.params;
  let filterObj = {};
  if (categoryId) {
    req.body.category = categoryId;
    filterObj = { category: categoryId };
  }
  req.body.filterObj = filterObj;
  delete req.params.categoryId;
  next();
};
//@desc Create subCategory
//@route POST /api/v1/subCategories
//@access Private/[Admin-Manager]
const createSubCategory = factory.createOne(SubCategory);

//@desc Get list of subCategories
//@route GET /api/v1/subCategories
//@access Public
const getSubCategories = factory.getAll(SubCategory);

//@desc Get a specific subCategory
//@route GET /api/v1/subCategories/:id
//@access Public
const getSubCategory = factory.getOne(SubCategory);

//@desc Update category
//@route PUT /api/v1/categories/:id
//@access Private/[Admin-Manager]
const allowedUpdates = ["name", "category"];
const updateSubCategory = factory.updateOne(SubCategory, allowedUpdates);

//@desc Delete category
//@route POST /api/v1/categories/:id
//@access Private/Admin
const deleteSubCategory = factory.deleteOne(SubCategory);

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  setFilterObjToBody,
  setSubCategoryIdToBody,
};
