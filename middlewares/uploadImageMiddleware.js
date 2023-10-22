const multer = require("multer");
const AppError = require("../utils/AppError");

const uploadSingleImage = (fieldName) => {
  const storage = multer.memoryStorage();
  //file upload config
  const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("Only images allowed", 400), false);
    }
  };
  const upload = multer({ storage, fileFilter });

  // Upload single image
  return upload.single(fieldName);
};
module.exports = { uploadSingleImage };
