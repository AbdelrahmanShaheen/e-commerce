const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Brand = require("../../models/brand");
const updateBrandValidator = [
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("A brand name must have at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("A brand name must have at most 32 characters")
    .custom(async (name) => {
      //check if there is a document with this name is exists.....
      const brand = await Brand.findOne({ name });
      if (brand) throw new Error("Duplicate! brand with this name exists!");
      return true;
    }),
  check("id")
    .isMongoId()
    .withMessage("Brand with that invalid id does not exist!"),
  validatorMiddleware,
];

const brandIdValidator = [
  check("id")
    .isMongoId()
    .withMessage("Brand with that invalid id does not exist!"),
  validatorMiddleware,
];

module.exports = { updateBrandValidator, brandIdValidator };
