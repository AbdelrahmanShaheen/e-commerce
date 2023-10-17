const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./db/mongoose.js");
const morgan = require("morgan");
const categoryRouter = require("./routers/categoryRouter.js");
const subCategoryRouter = require("./routers/subCategoryRouter.js");
const Category = require("./models/category.js");
const { getCategory } = require("./controllers/categoryController.js");
const AppError = require("./utils/AppError.js");
const globalErrorHandler = require("./middlewares/errorMiddleware.js");
const express = require("express");
const app = express();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subCategories", subCategoryRouter);
//Catching Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} on the server`, 404));
});
//Use Global Error Handling Middleware inside express
app.use(globalErrorHandler);
//........................
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Handling rejections that express does not handle
process.on("unhandledRejection", (error) => {
  console.error(`unhandledRejection Errors: ${error.name} | ${error.message}`);
  server.close(() => {
    console.error("Shutting down....");
    process.exit(1);
  });
});
