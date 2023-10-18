const { validationResult } = require("express-validator");
module.exports = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ errors: { msg: "No fields given to process!" } });
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
  }

  next();
};
