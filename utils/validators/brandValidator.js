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
  validatorMiddleware,
];

module.exports = updateBrandValidator;
