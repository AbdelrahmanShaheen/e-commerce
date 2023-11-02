const { check } = require("express-validator");
const User = require("../../models/user");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const addressIdValidator = [
  check("addressId")
    .isMongoId()
    .withMessage("Invalid address id format!")
    .custom(async (addressId, { req }) => {
      const { user } = req;
      const check = user.addresses.some(
        (address) => String(address._id) === addressId
      );
      if (!check) {
        throw new Error(`There is no address with this id: ${addressId}`);
      }
      return true;
    }),
  validatorMiddleware,
];
module.exports = { addressIdValidator };
