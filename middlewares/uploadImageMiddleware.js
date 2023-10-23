const multer = require("multer");
const AppError = require("../utils/AppError");

const multerOptions = () => {
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
  return upload;
};
const uploadSingleImage = (fieldName) => {
  const upload = multerOptions();
  // Upload single image
  return upload.single(fieldName);
};

const uploadMixOfImages = (arrayOfFields) => {
  const upload = multerOptions();
  // Upload single or multiple images
  return upload.fields(arrayOfFields);
};
module.exports = { uploadSingleImage, uploadMixOfImages };
