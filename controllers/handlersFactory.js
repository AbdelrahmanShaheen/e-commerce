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
    const document = await Model.findById(id);
    if (!document)
      return next(new AppError("Document with this id is not found", 404));
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
    //..............................
    updates.forEach((update) => {
      document[update] = req.body[update];
    });
    if (title || name) document["slug"] = slugify(title || name);
    document.save();
    res.status(200).send({ data: document });
  });
module.exports = { deleteOne, updateOne };
