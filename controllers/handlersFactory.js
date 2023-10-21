const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/apiFeatures");

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const document = await Model.findByIdAndRemove(id);
    if (!document)
      return next(new AppError("document with this id is not found", 404));
    res.status(204).send();
  });

module.exports = { deleteOne };
