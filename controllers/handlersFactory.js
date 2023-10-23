const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const slugify = require("slugify");
const ApiFeatures = require("../utils/apiFeatures");

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const document = await Model.findByIdAndRemove(id);
    if (!document)
      return next(new AppError("document with this id is not found", 404));
    res.status(204).send();
  });

const updateOne = (Model, allowedUpdates) =>
  asyncHandler(async (req, res, next) => {
    const { id, name, title } = req.body;
    delete req.body.id;
    //handle error when updating by field that does not exist in the document
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) return next(new AppError("invalid updates!", 400));
    //for models that contains a name and it's unique
    if (name) {
      const duplicateDocument = await Model.findOne({ name });
      //check if there is a document with this name is exists.....
      if (duplicateDocument)
        return next(
          new AppError("Duplicate! document with this name exists!", 400)
        );
    }

    if (title || name) req.body["slug"] = slugify(title || name);
    const document = await Model.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!document)
      return next(new AppError("Document with this id is not found", 404));

    res.status(200).send({ data: document });
  });

const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const { title, name } = req.body;
    if (title || name) req.body.slug = slugify(title || name);
    const document = new Model(req.body);
    await document.save();
    res.status(201).send({ data: document });
  });

const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const document = await Model.findOne({ _id: id });
    if (!document)
      return next(new AppError("document with this id is not found", 404));
    res.status(200).send({ data: document });
  });

const getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filterObj = {};
    if (req.body.filterObj) filterObj = req.body.filterObj;
    const apiFeatures = new ApiFeatures(
      Model.find(req.body.filterObj),
      req.query
    );
    const countDocuments = await Model.countDocuments();
    apiFeatures
      .filter()
      .paginate(countDocuments)
      .limitFields()
      .search(modelName)
      .sort();
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    res.status(200).send({
      results: documents.length,
      paginationResult,
      data: documents,
    });
  });
module.exports = { deleteOne, updateOne, createOne, getOne, getAll };
