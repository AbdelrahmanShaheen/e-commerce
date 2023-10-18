const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const updateBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("A brand must have a name")
    .isLength({ min: 3 })
    .withMessage("A brand name must have at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("A brand name must have at most 32 characters"),
  check("brandId")
    .isMongoId()
    .withMessage("Brand with that invalid id does not exist!"),
  validatorMiddleware,
];

const brandIdValidator = [
  check("brandId")
    .isMongoId()
    .withMessage("Brand with that invalid id does not exist!"),
  validatorMiddleware,
];

module.exports = { updateBrandValidator, brandIdValidator };
